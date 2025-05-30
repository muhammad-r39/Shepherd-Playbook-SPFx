export function getInitials(name: string): string {
  const parts = name.split(" ");
  const initials = parts
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2);
  return initials.join("");
}

export function getRandomColor(): string {
  const colors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#607D8B",
  ];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

export function verifyImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
