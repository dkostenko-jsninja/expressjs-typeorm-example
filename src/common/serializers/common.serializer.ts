import { Exclude } from "class-transformer";

import { CommonEntity } from "../entities/common.entity";

export class CommonSerializer implements CommonEntity {
  @Exclude()
  id: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
