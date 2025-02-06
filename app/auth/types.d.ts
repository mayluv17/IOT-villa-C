import type { Session } from "@prisma/client";

declare global {
  type CreateSession = Omit<Session, "createdAt">;

  type SessionValidationResult =
    | { session: Session; user: UserAttributes }
    | { session: null; user: null };

  type UserAttributes = {
    username: string;
    status: $Enums.Status;
    id: number;
    user_id: number | null;
    avatar: string | null;
    datetime: Date;
  };
}
