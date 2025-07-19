import { ObjectType, Field, InputType } from 'type-graphql';
import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { User } from './User';

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  token!: string;

  @Field(() => User)
  user!: User;
}

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  @MaxLength(254, { message: 'メールアドレスは254文字以内で入力してください' })
  email!: string;

  @Field(() => String)
  @IsString()
  @MinLength(1, { message: 'ユーザー名は必須です' })
  @MaxLength(50, { message: 'ユーザー名は50文字以内で入力してください' })
  @Matches(/^[a-zA-Z0-9_\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/, {
    message: 'ユーザー名は英数字、ひらがな、カタカナ、漢字、アンダースコアのみ使用可能です',
  })
  username!: string;

  @Field(() => String)
  @IsString()
  @MinLength(8, { message: 'パスワードは8文字以上である必要があります' })
  @MaxLength(128, { message: 'パスワードは128文字以内で入力してください' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'パスワードは8文字以上で、大文字・小文字・数字を含む必要があります',
  })
  password!: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @IsString()
  @MinLength(1)
  password!: string;
}

@InputType()
export class PasswordResetRequestInput {
  @Field(() => String)
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  email!: string;
}

@InputType()
export class PasswordResetInput {
  @Field(() => String)
  @IsString()
  @MinLength(1, { message: 'トークンは必須です' })
  token!: string;

  @Field(() => String)
  @IsString()
  @MinLength(8, { message: 'パスワードは8文字以上である必要があります' })
  @MaxLength(128, { message: 'パスワードは128文字以内で入力してください' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'パスワードは8文字以上で、大文字・小文字・数字を含む必要があります',
  })
  newPassword!: string;
}

@ObjectType()
export class PasswordResetResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}

@InputType()
export class EmailVerificationInput {
  @Field(() => String)
  @IsString()
  @MinLength(1, { message: 'トークンは必須です' })
  token!: string;
}

@InputType()
export class EmailChangeInput {
  @Field(() => String)
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  @MaxLength(254, { message: 'メールアドレスは254文字以内で入力してください' })
  newEmail!: string;
}

@InputType()
export class EmailChangeConfirmInput {
  @Field(() => String)
  @IsString()
  @MinLength(1, { message: 'トークンは必須です' })
  token!: string;
}

@ObjectType()
export class EmailVerificationResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}

@ObjectType()
export class EmailChangeResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}

@InputType()
export class ChangePasswordInput {
  @Field(() => String)
  @IsString()
  @MinLength(1, { message: '現在のパスワードは必須です' })
  currentPassword!: string;

  @Field(() => String)
  @IsString()
  @MinLength(8, { message: 'パスワードは8文字以上である必要があります' })
  @MaxLength(128, { message: 'パスワードは128文字以内で入力してください' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'パスワードは8文字以上で、大文字・小文字・数字を含む必要があります',
  })
  newPassword!: string;
}

@ObjectType()
export class ChangePasswordResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}
