export default interface ITokenVerifier {
  verify(token: string): boolean | Promise<boolean>;
}
