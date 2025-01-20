export default interface EnvironmentOptions<T> {
  getOrDefault(key: keyof T, defaultValue: T[keyof T]): T[keyof T];
}
