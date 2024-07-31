import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthCreateDto {
    @IsString({
        message: "Поле имя должно быть заполнено"
    })
    name: string;

    @IsEmail()
    email: string;

    @IsString({
        message: "Поле пароль должно быть заполено"
    })
    @MinLength(8, {
        message: 'Минимальное количество символов должно быть 8'
    })
    password: string;
}