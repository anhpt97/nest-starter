import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Index } from 'typeorm';
import { Idx, UserRole, UserStatus } from '~/common/enums';
import { ColumnVarChar, CreatedAt, PrimaryKeyColumn, UpdatedAt } from '~/utils';

@Entity('user')
export class User {
  @PrimaryKeyColumn()
  @ApiProperty()
  id: number;

  @ColumnVarChar()
  @Index(Idx.USERNAME, { unique: true })
  @ApiProperty()
  username: string;

  @ColumnVarChar()
  @Index(Idx.EMAIL, { unique: true })
  @ApiPropertyOptional()
  email: string;

  @ColumnVarChar({
    name: 'hashed_password',
    select: false,
  })
  hashedPassword: string;

  @ColumnVarChar()
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ColumnVarChar()
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

    @OneToOne(() => Profile, (profile) => profile.user)
    @JoinColumn({
      name: 'profile_id',
      foreignKeyConstraintName: 'fk_user_profile', // ForeignKey.USER_PROFILE
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
      foreignKeyConstraintName: 'fk_user_company', // ForeignKey.USER_COMPANY
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
    @ForeignKeyColumn({ name: 'category_id' })
    categoryId: number;

    @ForeignKeyColumn({ name: 'product_id' })
    productId: number;

    @ManyToOne(() => Category, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'category_id',
      foreignKeyConstraintName: 'fk_categoryProduct_category', // ForeignKey.CATEGORYPRODUCT_CATEGORY
    })
    category: Category;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    @JoinColumn({
      name: 'product_id',
      foreignKeyConstraintName: 'fk_categoryProduct_product', // ForeignKey.CATEGORYPRODUCT_PRODUCT
    })
    product: Product;
  */
}
