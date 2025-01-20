export default class User {
  private id: string | null = null;
  private email: string;
  private password: string;
  private username: string;

  constructor(username: string, email: string, password: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }

  getId() {
    return this.id;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
  getUsername(): string {
    return this.username;
  }
  setId(id: string): void {
    this.id = id;
  }
  setEmail(email: string): void {
    this.email = email;
  }
  setPassword(password: string): void {
    this.password = password;
  }

  setUsername(username: string): void {
    this.username = username;
  }
}
