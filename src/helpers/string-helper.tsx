export function titleCase(str: string): string {
    const words = str.toLowerCase().split(" ");
    const titleCasedWords = words.map((word) => {
        if (word.length === 0) {
            return ""; 
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return titleCasedWords.join(" ");
}
