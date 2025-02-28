import { HTTP } from "../../../shared/api";
import { Tests } from "../model";

export const getTests = async (): Promise<Tests[]> => {
    try {
        const users = await HTTP.get<Tests[]>('http://localhost:3100/tests');
        return users;
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        throw error;
    }
};
