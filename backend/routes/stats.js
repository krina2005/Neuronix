import express from 'express';
import BrainStats from '../models/BrainStats.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/* --------------------------------------------------
   GET: Get latest brain stats (single document)
-------------------------------------------------- */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const stats = await BrainStats.findOne({ userId: req.userId });

    if (!stats) {
      return res.status(404).json({ message: 'No stats found yet' });
    }

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error while fetching stats' });
  }
});

/* --------------------------------------------------
   POST: Create OR Update brain stats (UPSERT)
-------------------------------------------------- */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      focusLevel,
      logicPower,
      bugCount,
      coffeeDependency,
      brainRamUsage,
    } = req.body;

    // Validation
    if (
      focusLevel == null ||
      logicPower == null ||
      bugCount == null ||
      coffeeDependency == null ||
      brainRamUsage == null
    ) {
      return res.status(400).json({ message: 'All stats fields are required' });
    }

    const updatedStats = await BrainStats.findOneAndUpdate(
      { userId: req.userId },               // 🔍 find by user
      {
        focusLevel,
        logicPower,
        bugCount,
        coffeeDependency,
        brainRamUsage,
        updatedAt: new Date(),
      },
      {
        upsert: true,                        // ✅ create if not exists
        new: true,                           // ✅ return updated doc
      }
    );

    res.status(200).json({
      message: 'Stats saved successfully',
      stats: updatedStats,
    });
  } catch (error) {
    console.error('Save stats error:', error);
    res.status(500).json({ message: 'Server error while saving stats' });
  }
});

export default router;
