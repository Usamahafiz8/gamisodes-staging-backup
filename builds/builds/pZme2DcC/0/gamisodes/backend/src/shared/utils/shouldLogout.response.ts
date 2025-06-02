export class ShouldLogoutResponse {
  constructor(shouldLogout: boolean) {
    this.shouldLogout = shouldLogout;
  }

  shouldLogout: boolean;
  success: boolean = true;
}
