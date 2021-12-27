import {
  Table,
  ForeignKey,
  Model,
  Column,
  PrimaryKey,
  IsUUID,
  CreatedAt,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import Team from "./Team";
import User from "./User";

@Table({ tableName: "search_queries", modelName: "search_query" })
class SearchQuery extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @CreatedAt
  createdAt: Date;

  @Column(DataType.ENUM("slack", "app", "api"))
  source: string;

  @Column
  results: number;

  @Column(DataType.STRING)
  set query(value: string) {
    this.setDataValue("query", value.substring(0, 255));
  }

  get query() {
    return this.getDataValue("query");
  }

  // associations

  @BelongsTo(() => User, "userId")
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => Team, "teamId")
  team: Team;

  @ForeignKey(() => Team)
  @Column(DataType.UUID)
  teamId: string;
}

export default SearchQuery;
