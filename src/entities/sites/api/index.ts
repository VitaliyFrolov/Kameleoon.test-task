import { HTTP } from "../../../shared/api";
import { Sites } from "../model";

export const getSites = async (): Promise<Sites[]> => {
    try {
        const users = await HTTP.get<Sites[]>('http://localhost:3100/sites');
        return users;
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        throw error;
    }
};
