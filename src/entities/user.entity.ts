import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Index } from 'typeorm';
import { Idx, UserRole, UserStatus } from '~/common/enums';
import { ColumnVarchar, CreatedAt, PrimaryKeyColumn, UpdatedAt } from '~/utils';

@Entity('user')
export class User {
  @PrimaryKeyColumn()
  @ApiProperty()
  id: number;

  @ColumnVarchar()
  @Index(Idx.Username, { unique: true })
  @ApiProperty()
  username: string;

  @ColumnVarchar()
  @Index(Idx.Email, { unique: true })
  @ApiPropertyOptional()
  email: string;

  @ColumnVarchar({
    name: 'hashed_password',
    select: false,
  })
  hashedPassword: string;

  @ColumnVarchar()
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ColumnVarchar()
  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  /* Relationship:
    – One-to-one:
    (src/entities/user.entity.ts)
    @ForeignKeyColumn({ name: 'profile_id' })
    profileId: number;

    @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'profile_id',
      foreignKeyConstraintName: 'fk_user_profile', // ForeignKey.User_Profile
    })
    profile: Profile;

    (src/entities/profile.entity.ts)
    @OneToOne(() => User, (user) => user.profile)
    user: User;

    – One-to-many:
    (src/entities/company.entity.ts)
    @OneToMany(() => User, (user) => user.company)
    users: User[];

    – Many-to-one:
    (src/entities/user.entity.ts)
    @ForeignKeyColumn({ name: 'company_id' })
    companyId: number;

    @ManyToOne(() => Company, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'company_id',
      foreignKeyConstraintName: 'fk_user_company', // ForeignKey.User_Company
    })
    company: Company;

    – Many-to-many:
    (src/entities/category.entity.ts)
    @OneToMany(
      () => CategoryProduct,
      (categoryProduct) => categoryProduct.category,
    )
    categoryProducts: CategoryProduct[];

    (src/entities/product.entity.ts)
    @OneToMany(
      () => CategoryProduct,
      (categoryProduct) => categoryProduct.product,
    )
    categoryProducts: CategoryProduct[];

    (src/entities/category_product.entity.ts)
    @PrimaryKeyColumn({
      name: 'category_id',
      generated: false,
    })
    categoryId: number;

    @PrimaryKeyColumn({
      name: 'product_id',
      generated: false,
    })
    productId: number;

    @ManyToOne(() => Category, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'category_id',
      foreignKeyConstraintName: 'fk_categoryProduct_category', // ForeignKey.CategoryProduct_Category
    })
    category: Category;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'product_id',
      foreignKeyConstraintName: 'fk_categoryProduct_product', // ForeignKey.CategoryProduct_Product
    })
    product: Product;
  */
}
