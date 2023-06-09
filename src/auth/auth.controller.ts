import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(AuthCredentialsDto);
    }

    @Post('/authTest')
    @UseGuards(AuthGuard())
    authTest(@GetUser() user: User) {
        console.log('user', user);
    }

}
