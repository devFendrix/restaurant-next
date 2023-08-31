// Génère un ID en fonction du nombre d'entrées dans un JSON puis l'incrémente de 1
const generateNewId = <T extends { id: number }>(data: T[]): number => {
    const existingIds = data.map((item) => item.id);
    const maxId = Math.max(...existingIds);
    return maxId + 1;
};

export default generateNewId;
