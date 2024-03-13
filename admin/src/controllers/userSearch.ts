
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userSearch = async (req: Request, res: Response) => {
    const { searchTerm } = req.query;

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: searchTerm as string } },
                    { email: { contains: searchTerm as string } },
                    { class: { contains: searchTerm as string } },
                ],
            },
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).send('Error searching users');
    }
};

export { userSearch };
