import express from 'express';
import prisma from '../lib/db.js';
const router = express.Router();

router.post('/healthstatus', async (req, res) => {
    try {
        const {
            userId,
            age,
            gender,
            height,
            weight,
            activityLevel,
            medicalConditions,
            allergies,
            pregnancyStatus,
            breastfeeding,
            recentSurgery,
            chronicPain,
            digestiveIssues
        } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }


        const existingProfile = await prisma.healthProfile.findUnique({
            where: { userId: parseInt(userId) }
        });

        let healthProfile;

        if (existingProfile) {

            healthProfile = await prisma.healthProfile.update({
                where: { userId: parseInt(userId) },
                data: {
                    age: age ? parseInt(age) : existingProfile.age,
                    gender: gender || existingProfile.gender,
                    height: height ? parseFloat(height) : existingProfile.height,
                    weight: weight ? parseFloat(weight) : existingProfile.weight,
                    activityLevel: activityLevel || existingProfile.activityLevel,
                    medicalConditions: medicalConditions || existingProfile.medicalConditions,
                    allergies: allergies || existingProfile.allergies,
                    pregnancyStatus: pregnancyStatus !== undefined ? pregnancyStatus : existingProfile.pregnancyStatus,
                    breastfeeding: breastfeeding !== undefined ? breastfeeding : existingProfile.breastfeeding,
                    recentSurgery: recentSurgery !== undefined ? recentSurgery : existingProfile.recentSurgery,
                    chronicPain: chronicPain !== undefined ? chronicPain : existingProfile.chronicPain,
                    digestiveIssues: digestiveIssues || existingProfile.digestiveIssues
                }
            });
        } else {

            healthProfile = await prisma.healthProfile.create({
                data: {
                    userId: parseInt(userId),
                    age: age ? parseInt(age) : null,
                    gender,
                    height: height ? parseFloat(height) : null,
                    weight: weight ? parseFloat(weight) : null,
                    activityLevel,
                    medicalConditions: medicalConditions || [],
                    allergies: allergies || [],
                    pregnancyStatus,
                    breastfeeding,
                    recentSurgery,
                    chronicPain,
                    digestiveIssues: digestiveIssues || []
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: existingProfile ? 'Health profile updated successfully' : 'Health profile created successfully',
            data: healthProfile
        });
    } catch (error) {
        console.error('Error handling health status:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to process health status',
            error: error.message
        });
    }
});

router.get('/healthstatus/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const healthProfile = await prisma.healthProfile.findUnique({
            where: { userId }
        });

        if (!healthProfile) {
            return res.status(404).json({
                success: false,
                message: 'Health profile not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: healthProfile
        });
    } catch (error) {
        console.error('Error fetching health profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch health profile',
            error: error.message
        });
    }
});


router.delete('/healthstatus/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const existingProfile = await prisma.healthProfile.findUnique({
            where: { userId }
        });

        if (!existingProfile) {
            return res.status(404).json({
                success: false,
                message: 'Health profile not found'
            });
        }

        await prisma.healthProfile.delete({
            where: { userId }
        });

        return res.status(200).json({
            success: true,
            message: 'Health profile deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting health profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete health profile',
            error: error.message
        });
    }
});

export default router;