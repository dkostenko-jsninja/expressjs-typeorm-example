export class CustomDate {
  currentDate(): string {
    return new Date().toISOString();
  }

  addDays(days: number): string {
    const currentDate = new Date();
    const futureDate = currentDate.setDate(currentDate.getDate() + days);

    return new Date(futureDate).toISOString();
  }

  daysBetween(firstISODate: string, secondISODate: string): number {
    const firstDate = new Date(firstISODate);
    const secondDate = new Date(secondISODate);

    const first = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    const second = new Date(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const millisBetween = second.getTime() - first.getTime();
    const days = millisBetween / millisecondsPerDay;

    return Math.floor(days);
  }
}
