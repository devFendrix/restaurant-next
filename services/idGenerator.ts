const generateNewId = <T extends { id: number }>(data: T[]): number => {
    const existingIds = data.map((item) => item.id);
    const maxId = Math.max(...existingIds);
    return maxId + 1;
};

export default generateNewId;
