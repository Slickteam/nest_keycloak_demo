import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'https://keycloak.slickteam.fr/auth',
      realm: 'slick-dev',
      clientId: 'nest-demo',
      secret:
        'MIICoTCCAYkCBgGAlJTppjANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAluZXN0LWRlbW8wHhcNMjIwNTA1MTQxNTI4WhcNMzIwNTA1MTQxNzA4WjAUMRIwEAYDVQQDDAluZXN0LWRlbW8wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCEbvGBRr1XSrLX4j4N+XZPTpV9VjSKwlsK3EcFqsqFXNjc46R9kRWFb2WxgNZ7OIWcgSgDTuNXGF8/2Y159g3FWrsQ7J6+6Is9zkoamDkXp2lmXpXDpDh36TtHE1m08hVe8LExJhSWcviHln+ECKW5PjJndzI1IHfrL+31b0Is2iKBtVwkfXHrxpmyNSV/bg4OHfRbLf4ZaJszR3ql1yzF3fDeEkKkENvZB9hUEMdNx2za7Z0tHBP2xSMFTPcUeXzMKS/sqBm4H2c4FrSWanKXwWd+fX7LTBPq+/bkvRAp7zC/MzWTbMxAWZAAEW7P5IVBNtkJmrFa9Wa4Xfv7BV3/AgMBAAEwDQYJKoZIhvcNAQELBQADggEBACZznDN7nRxVJtD4jk9XZ3WgPStgsuaTitTq+JzS9LVs1HE1lYOEPnzjni+PkvvIUYJK+qtRiuXnnXe4IifRG3xloCcVsJYnf6VoDJUhAA5E5OPPXBTLqzpdQJZLXlfl/iW9WLwblUPKsJd1BQH3U/IxXyjKDPhf1mc1wOrf9BJI1l/QVeacFP5a5VBR3omXkD++WnUEJOhqKeicBEJ3CoeBv1WQTKwBkNRf4Cb55BlDzbTiPvBpMhWuqqdOfACHHWl7QI8R2VcBrZM8FSWJcbpgtGSJk7BVfKzgk473ezRY4qJHM0LX+fN7wUqY1Kga+SnzIma3MRzgFLyJcVJZ4Mo=',
      // Secret key of the client taken from keycloak server
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and
    // methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
