import { createCSRFTokenResponse } from '../../../lib/security/csrf-protection';

export async function GET() {
  return createCSRFTokenResponse();
}
