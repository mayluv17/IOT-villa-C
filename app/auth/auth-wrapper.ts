import { redirect } from 'next/navigation';
import { validateSession } from './session';
import { getPathname } from './misc';

export function authWrapper<Ctx extends any[], CReturn>(
  func: (user: UserAttributes, ...ctx: Ctx) => Promise<CReturn>
) {
  return async (...ctx: Ctx): Promise<CReturn> => {
    try {
      const { user } = await validateSession();

      if (!user) {
        return redirect(`/login/?redirectPath=${await getPathname()}`);
      }

      return func(user, ...ctx);
    } catch (error) {
      return redirect(`/login/?redirectPath=${await getPathname()}`);
      //return { error: true, message: "User not authenticated" };
    }
  };
}
