import { registerEnumType } from "@nestjs/graphql";

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GALLERY = 'gallery',
  GUEST = 'guest'
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User roles',
});