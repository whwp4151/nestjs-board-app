import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { ExtractJwt, Strategy}  from "passport-jwt";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger('JwtStrategy');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
         const { username } = payload;
         this.logger.verbose(`find User : ${username}`);
         const user: User = await this.userRepository.findOne({
            where: {
                username
            }
         });

         if (!user) {
            throw new UnauthorizedException();
         }

         return user;
    }
}