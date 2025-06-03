# Driving Express Content Database Documentation

**Version:** 1.0
**Last Updated:** June 3, 2025

---

## 1. Database Overview

### 1.1 Purpose of the Database

The Driving Express Database is designed to support a modern, feature-rich content and community platform. It manages users, content (posts, articles), categorization, user interactions (comments, reviews), media assets, site navigation, legal documents, user consent (cookies), advertising, and detailed user activity tracking.

### 1.2 High-level Description of the System/Application

The database underpins a dynamic web application that likely serves as a publishing platform, blog, or news site with robust user engagement features. It includes functionalities for content creation and delivery, user account management, personalization, community interaction, SEO optimization, advertising revenue generation, and analytics.

### 1.3 Key Business Processes and Use Cases

- **User Management:** Registration, login, profile management, role-based access.
- **Content Creation & Management:** Writing, editing, publishing, and organizing articles/posts.
- **Content Consumption:** Users reading posts, viewing media, navigating categories and tags.
- **SEO & Content Discovery:** Managing SEO metadata, related posts, redirects for optimal search engine performance.
- **Community Engagement:** Users commenting on posts, leaving reviews, and receiving notifications.
- **Personalization:** Users setting content preferences, segmenting users for targeted experiences.
- **Media Management:** Uploading and serving images and other media assets.
- **Site Administration:** Managing site settings, navigation menus, FAQs, and legal documents.
- **Consent Management:** Tracking user consent for cookie usage in compliance with privacy regulations.
- **Advertising:** Displaying ads, tracking impressions and clicks.
- **Analytics & Tracking:** Monitoring user behavior, device information, and campaign effectiveness.
- **Support & Communication:** Handling contact submissions.

---

## 2. Entity-Relationship (ER) Diagram

_(Note: A visual ER Diagram would be generated using a database diagramming tool by importing the schema or manually drawing it. Below is a conceptual description of relationships. The Prisma schema itself serves as a detailed textual representation of these relationships.)_

The database is centered around the **User** and **Post** entities.

- **User** has relationships with `Account` (for authentication), `Session`, `User_Category_Preference`, `Post` (as author), `Comment`, `PostReview`, `Notification`, `MediaAsset` (as uploader), `TrackingSession`, `TrackingEvent`, `ActivityLog`, `DeviceFingerprint`, `AdImpression`, `AdClick`, and `UserCookieConsent`.
- **Post** is central to content, linking to `Category`, `User` (author), `Tag` (many-to-many through an implicit join table managed by Prisma), `TableOfContentItem`, `ArticleImage`, `RelatedPost`, `SEO_Metadata`, `Comment`, `Redirect`, `SchemaMarkup`, and `PostReview`.
- **Category** supports hierarchical structures (parent-child).
- Advertising models (`Advertisement`, `AdPlacement`) link to tracking models (`AdImpression`, `AdClick`, `TrackingSession`).
- Consent models (`CookieCategory`, `CookieDefinition`, `UserCookieConsent`) manage user privacy choices.
- Site structure is supported by `NavigationMenu`, `FAQCategory`, and `LegalDocument`.

---

## 3. Table Descriptions

This section details each table (model) defined in the Prisma schema.

_(Note: Prisma types are mapped to general SQL types. Specific PostgreSQL types like `Uuid`, `Timestamptz(6)`, `VarChar(n)`, `SmallInt`, `BigInt` are used as defined in the schema.)_

---

### **ENUMS**

---

**Enum: `UserRole`**

- **Description:** Defines the possible roles a user can have within the system.
- **Values:**
  - `subscriber`
  - `business_user`
  - `admin`
  - `editor`
  - `author_role`
  - `guest`
  - `standard` (default)

**Enum: `LegalDocumentVersionStatus`**

- **Description:** Defines the status of a specific version of a legal document.
- **Values:**
  - `draft` (default)
  - `published`
  - `archived`

---

### **USER AND ACCOUNT MODELS**

---

**1. Table: `User`**

- **Purpose:** Stores information about registered users.
- **Columns:**
  - `id` (Uuid, PK): Unique identifier for the user. Default: `uuid()`.
  - `name` (String?): User's full name. Nullable.
  - `email` (String, Unique): User's email address. Must be unique.
  - `email_verified` (DateTime?): Timestamp when the user's email was verified. `TIMESTAMPTZ(6)`. Nullable.
  - `image` (String?): URL to the user's profile image. Nullable.
  - `role` (UserRole): Role of the user. Default: `standard`.
  - `author_slug` (String?, Unique): Unique slug for author profiles (if applicable). Nullable.
  - `bio` (String?): Short biography of the user. Nullable.
  - `social_media_links` (Json?): JSON object storing links to user's social media profiles. Nullable.
  - `created_at` (DateTime): Timestamp of user creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last user update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Indexes:**
  - `email` (unique)
- **Relationships:**
  - One-to-Many with `Account`, `Session`, `User_Category_Preference`, `Post` (as "PostAuthor"), `Comment`, `PostReview`, `Notification`, `MediaAsset`, `TrackingSession`, `TrackingEvent`, `ActivityLog`, `DeviceFingerprint`, `AdImpression`, `AdClick`, `UserCookieConsent`.

**2. Table: `Account`**

- **Purpose:** Stores OAuth account information linked to users (e.g., Google, Facebook login).
- **Columns:**
  - `user_id` (String, FK): ID of the user this account belongs to. `Uuid`.
  - `type` (String): Type of account (e.g., "oauth", "credentials").
  - `provider` (String): OAuth provider name (e.g., "google", "github").
  - `provider_account_id` (String): User's ID from the OAuth provider.
  - `refresh_token` (String?): OAuth refresh token. Nullable.
  - `access_token` (String?): OAuth access token. Nullable.
  - `expires_at` (Int?): Expiry timestamp for the access token. Nullable.
  - `token_type` (String?): Type of token (e.g., "Bearer"). Nullable.
  - `scope` (String?): Scope granted by the OAuth provider. Nullable.
  - `id_token` (String?): ID token from OAuth provider. Nullable.
  - `session_state` (String?): Session state from OAuth provider. Nullable.
  - `created_at` (DateTime): Timestamp of account creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last account update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Primary Key:** Composite (`provider`, `provider_account_id`).
- **Foreign Keys:**
  - `user_id` references `User(id)`. On Delete: Cascade.
- **Indexes:**
  - `user_id`

**3. Table: `Session`**

- **Purpose:** Stores user session information for authentication.
- **Columns:**
  - `session_token` (String, PK): Unique session token.
  - `user_id` (String, FK): ID of the user this session belongs to. `Uuid`.
  - `expires` (DateTime): Timestamp when the session expires. `TIMESTAMPTZ(6)`.
  - `created_at` (DateTime): Timestamp of session creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last session update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `user_id` references `User(id)`. On Delete: Cascade.
- **Indexes:**
  - `user_id`

**4. Table: `VerificationToken`**

- **Purpose:** Stores tokens for email verification or password reset.
- **Columns:**
  - `identifier` (String): Typically the user's email or ID.
  - `token` (String): The verification token.
  - `expires` (DateTime): Timestamp when the token expires. `TIMESTAMPTZ(6)`.
- **Primary Key:** Composite (`identifier`, `token`).

**5. Table: `User_Category_Preference`**

- **Purpose:** Stores user preferences for specific content categories.
- **Columns:**
  - `user_id` (String, FK): ID of the user. `Uuid`.
  - `category_id` (String, FK): ID of the category. `Uuid`.
  - `preference_set_at` (DateTime): Timestamp when the preference was set. Default: `now()`. `TIMESTAMPTZ(6)`.
- **Primary Key:** Composite (`user_id`, `category_id`).
- **Foreign Keys:**
  - `user_id` references `User(id)`. On Delete: Cascade.
  - `category_id` references `Category(category_id)`. On Delete: Cascade.
- **Indexes:**
  - `category_id`

**6. Table: `UserProfileSegment`**

- **Purpose:** Assigns users to specific segments for targeting or analysis.
- **Columns:**
  - `user_id` (String, FK): ID of the user. `Uuid`.
  - `segment_slug` (String): Unique slug identifying the segment. `VARCHAR(100)`.
  - `assigned_at` (DateTime): Timestamp when the user was assigned to the segment. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `confidence_score` (Float?): A score indicating the confidence of this assignment. Nullable.
- **Primary Key:** Composite (`user_id`, `segment_slug`).
- **Foreign Keys:**
  - `user_id` references `User(id)`. On Delete: Cascade.
- **Indexes:**
  - `segment_slug`

---

### **CATEGORY AND TAG MODELS**

---

**7. Table: `Category`**

- **Purpose:** Organizes posts into hierarchical categories.
- **Columns:**
  - `category_id` (String, PK): Unique identifier for the category. Default: `uuid()`. `Uuid`.
  - `name` (String): Name of the category. `VARCHAR(100)`.
  - `slug` (String, Unique): URL-friendly slug for the category. `VARCHAR(100)`.
  - `parent_category_id` (String?, FK): ID of the parent category for hierarchical structure. `Uuid`. Nullable.
  - `created_at` (DateTime): Timestamp of category creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last category update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `parent_category_id` references `Category(category_id)` (self-referencing).
- **Indexes:**
  - `parent_category_id`
- **Relationships:**
  - One-to-Many with `Post`.
  - One-to-Many with `User_Category_Preference`.
  - Self-referencing for parent/child categories.

**8. Table: `Tag`**

- **Purpose:** Allows tagging of posts for more granular content organization.
- **Columns:**
  - `tag_id` (String, PK): Unique identifier for the tag. Default: `uuid()`. `Uuid`.
  - `name` (String, Unique): Name of the tag. `VARCHAR(50)`.
  - `created_at` (DateTime): Timestamp of tag creation. Default: `now()`. `TIMESTAMPTZ(6)`.
- **Relationships:**
  - Many-to-Many with `Post` (managed by Prisma via an implicit join table `_PostToTag`).

---

### **POST MODELS**

---

**9. Table: `Post`**

- **Purpose:** Stores the main content articles or posts.
- **Columns:**
  - `post_id` (String, PK): Unique identifier for the post. Default: `uuid()`. `Uuid`.
  - `title` (String): Title of the post. `VARCHAR(255)`.
  - `slug` (String, Unique): URL-friendly slug for the post. `VARCHAR(255)`.
  - `keywords` (String?): Keywords for SEO. Nullable.
  - `main_photo_url` (String?): URL of the main photo for the post. `VARCHAR(255)`. Nullable.
  - `main_photo_alt` (String?): Alt text for the main photo. `VARCHAR(255)`. Nullable.
  - `excerpt` (String?): A short summary or excerpt of the post. Nullable.
  - `article_content` (String): Full content of the article.
  - `is_featured` (Boolean): Flag to indicate if the post is featured. Default: `false`.
  - `category_id` (String?, FK): ID of the category this post belongs to. `Uuid`. Nullable.
  - `author_id` (String?, FK): ID of the user who authored this post. `Uuid`. Nullable.
  - `view_count` (Int): Number of views for the post. Default: `0`.
  - `average_rating` (Float): Average rating from post reviews. Default: `0.0`.
  - `review_count` (Int): Number of reviews for the post. Default: `0`.
  - `created_at` (DateTime): Timestamp of post creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last post update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `category_id` references `Category(category_id)`. On Delete: SetNull.
  - `author_id` references `User(id)` (relation name "PostAuthor"). On Delete: SetNull.
- **Indexes:**
  - `category_id`
  - `author_id`
  - `is_featured`
  - `created_at`
- **Relationships:**
  - Many-to-Many with `Tag`.
  - One-to-Many with `TableOfContentItem`, `ArticleImage`, `Comment`, `PostReview`, `Redirect`.
  - One-to-One with `SEO_Metadata`, `SchemaMarkup`.
  - Many-to-Many with self via `RelatedPost` (`relatedPostsA`, `relatedPostsB`).

**10. Table: `TableOfContentItem`**

- **Purpose:** Stores items for a post's table of contents.
- **Columns:**
  - `toc_item_id` (String, PK): Unique identifier for the TOC item. Default: `uuid()`. `Uuid`.
  - `post_id` (String, FK): ID of the post this TOC item belongs to. `Uuid`.
  - `item_html_id` (String): HTML ID of the section this item links to. `VARCHAR(100)`.
  - `title` (String): Display title for the TOC item. `VARCHAR(255)`.
  - `display_order` (Int): Order in which the item appears in the TOC.
  - `created_at` (DateTime): Timestamp of TOC item creation. Default: `now()`. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `post_id` references `Post(post_id)`. On Delete: Cascade.
- **Unique Constraints:**
  - Composite (`post_id`, `item_html_id`).

**11. Table: `ArticleImage`**

- **Purpose:** Stores images embedded within an article, distinct from the main photo.
- **Columns:**
  - `article_image_id` (String, PK): Unique identifier for the article image. Default: `uuid()`. `Uuid`.
  - `post_id` (String, FK): ID of the post this image belongs to. `Uuid`.
  - `image_url` (String): URL of the image. `VARCHAR(255)`.
  - `alt_text` (String?): Alt text for the image. `VARCHAR(255)`. Nullable.
  - `display_order` (Int?): Order of the image within the article. Nullable.
  - `created_at` (DateTime): Timestamp of image record creation. Default: `now()`. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `post_id` references `Post(post_id)`. On Delete: Cascade.
- **Indexes:**
  - `post_id`

**12. Table: `RelatedPost`**

- **Purpose:** Defines a many-to-many relationship between posts to link related content.
- **Columns:**
  - `post_id_1` (String, FK): ID of the first post in the relationship. `Uuid`.
  - `post_id_2` (String, FK): ID of the second post in the relationship. `Uuid`.
  - `created_at` (DateTime): Timestamp of relationship creation. Default: `now()`. `TIMESTAMPTZ(6)`.
- **Primary Key:** Composite (`post_id_1`, `post_id_2`).
- **Foreign Keys:**
  - `post_id_1` references `Post(post_id)` (relation name "RelatedPostA"). On Delete: Cascade.
  - `post_id_2` references `Post(post_id)` (relation name "RelatedPostB"). On Delete: Cascade.
- **Indexes:**
  - `post_id_2`

**13. Table: `SEO_Metadata`**

- **Purpose:** Stores SEO-specific metadata for posts.
- **Columns:**
  - `seo_metadata_id` (String, PK): Unique identifier for the SEO metadata record. Default: `uuid()`. `Uuid`.
  - `post_id` (String, FK, Unique): ID of the post this metadata belongs to. `Uuid`.
  - `meta_title` (String?): Custom meta title for SEO. `VARCHAR(255)`. Nullable.
  - `meta_description` (String?): Custom meta description for SEO. Nullable.
  - `meta_keywords` (String?): Custom meta keywords for SEO. Nullable.
  - `canonical_url` (String?): Canonical URL for the post. `VARCHAR(255)`. Nullable.
  - `opengraph_title` (String?): OpenGraph title for social sharing. `VARCHAR(255)`. Nullable.
  - `opengraph_description` (String?): OpenGraph description. Nullable.
  - `opengraph_image_url` (String?): OpenGraph image URL. `VARCHAR(255)`. Nullable.
  - `twitter_card_type` (String?): Twitter card type (e.g., "summary_large_image"). `VARCHAR(50)`. Nullable.
  - `twitter_title` (String?): Twitter title. `VARCHAR(255)`. Nullable.
  - `twitter_description` (String?): Twitter description. Nullable.
  - `twitter_image_url` (String?): Twitter image URL. `VARCHAR(255)`. Nullable.
  - `created_at` (DateTime): Timestamp of record creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last record update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `post_id` references `Post(post_id)`. On Delete: Cascade.

**14. Table: `Comment`**

- **Purpose:** Stores user comments on posts, supports threaded replies.
- **Columns:**
  - `comment_id` (String, PK): Unique identifier for the comment. Default: `uuid()`. `Uuid`.
  - `post_id` (String, FK): ID of the post this comment belongs to. `Uuid`.
  - `user_id` (String, FK): ID of the user who wrote the comment. `Uuid`.
  - `parent_comment_id` (String?, FK): ID of the parent comment if this is a reply. `Uuid`. Nullable.
  - `comment_text` (String): Content of the comment.
  - `is_approved` (Boolean): Flag to indicate if the comment is approved and visible. Default: `false`.
  - `created_at` (DateTime): Timestamp of comment creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last comment update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `post_id` references `Post(post_id)`. On Delete: Cascade.
  - `user_id` references `User(id)`. On Delete: Cascade.
  - `parent_comment_id` references `Comment(comment_id)` (relation name "CommentToParent"). On Delete: Cascade.
- **Indexes:**
  - `post_id`
  - `user_id`
  - `parent_comment_id`

**15. Table: `PostReview`**

- **Purpose:** Stores user reviews and ratings for posts.
- **Columns:**
  - `review_id` (String, PK): Unique identifier for the review. Default: `uuid()`. `Uuid`.
  - `post_id` (String, FK): ID of the post being reviewed. `Uuid`.
  - `user_id` (String, FK): ID of the user who wrote the review. `Uuid`.
  - `rating_value` (Int): Rating value given by the user (e.g., 1-5). `SmallInt`.
  - `title` (String?): Optional title for the review. `VARCHAR(255)`. Nullable.
  - `content` (String?): Optional detailed content of the review. Nullable.
  - `is_approved` (Boolean): Flag to indicate if the review is approved and visible. Default: `true`.
  - `created_at` (DateTime): Timestamp of review creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last review update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `post_id` references `Post(post_id)`. On Delete: Cascade.
  - `user_id` references `User(id)`. On Delete: Cascade.
- **Unique Constraints:**
  - Composite (`post_id`, `user_id`) - a user can review a post only once.
- **Indexes:**
  - `post_id`
  - `user_id`
  - `is_approved`

---

### **MEDIA ASSET AND NAVIGATION MODELS**

---

**16. Table: `MediaAsset`**

- **Purpose:** Stores information about uploaded media files (images, videos, documents).
- **Columns:**
  - `asset_id` (String, PK): Unique identifier for the media asset. Default: `uuid()`. `Uuid`.
  - `uploader_user_id` (String?, FK): ID of the user who uploaded the asset. `Uuid`. Nullable.
  - `file_name_original` (String): Original name of the uploaded file. `VARCHAR(255)`.
  - `file_name_stored` (String, Unique): Name of the file as stored on the server/CDN (potentially hashed or renamed). `VARCHAR(255)`.
  - `file_type` (String): MIME type of the file (e.g., "image/jpeg"). `VARCHAR(100)`.
  - `file_size_bytes` (BigInt): Size of the file in bytes.
  - `storage_path` (String): Path to the file in the storage system (e.g., S3 bucket path). `VARCHAR(1024)`.
  - `public_url` (String?, Unique): Publicly accessible URL for the asset. `VARCHAR(2048)`. Nullable.
  - `alt_text` (String?): Alternative text for accessibility (primarily for images). `VARCHAR(255)`. Nullable.
  - `caption` (String?): Caption for the media asset. Nullable.
  - `dimensions` (Json?): JSON object storing dimensions (e.g., width, height for images). Nullable.
  - `metadata` (Json?): JSON object for storing other relevant metadata (e.g., EXIF data). Nullable.
  - `uploaded_at` (DateTime): Timestamp of asset upload. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last asset update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `uploader_user_id` references `User(id)`. On Delete: SetNull.
- **Indexes:**
  - `uploader_user_id`

**17. Table: `NavigationMenu`**

- **Purpose:** Defines navigation menus for the site (e.g., header menu, footer menu).
- **Columns:**
  - `menu_id` (String, PK): Unique identifier for the navigation menu. Default: `uuid()`. `Uuid`.
  - `name` (String, Unique): Name of the menu (e.g., "Main Header"). `VARCHAR(100)`.
  - `description` (String?): Optional description of the menu's purpose. Nullable.
  - `created_at` (DateTime): Timestamp of menu creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last menu update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Relationships:**
  - One-to-Many with `NavigationMenuItem`.

**18. Table: `NavigationMenuItem`**

- **Purpose:** Stores individual items within a navigation menu, supports hierarchical structure.
- **Columns:**
  - `item_id` (String, PK): Unique identifier for the menu item. Default: `uuid()`. `Uuid`.
  - `menu_id` (String, FK): ID of the navigation menu this item belongs to. `Uuid`.
  - `parent_item_id` (String?, FK): ID of the parent menu item for sub-menus. `Uuid`. Nullable.
  - `title` (String): Display text for the menu item. `VARCHAR(100)`.
  - `url` (String): URL the menu item links to. `VARCHAR(2048)`.
  - `target` (String?): Link target (e.g., "\_blank"). `VARCHAR(20)`. Nullable.
  - `icon_class` (String?): CSS class for an icon associated with the item. `VARCHAR(100)`. Nullable.
  - `display_order` (Int): Order of the item within its menu level. Default: `0`.
  - `created_at` (DateTime): Timestamp of item creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last item update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `menu_id` references `NavigationMenu(menu_id)`. On Delete: Cascade.
  - `parent_item_id` references `NavigationMenuItem(item_id)` (relation name "MenuItemToParent"). On Delete: Cascade.
- **Indexes:**
  - `menu_id`
  - `parent_item_id`

**19. Table: `SiteSetting`**

- **Purpose:** Stores global site settings as key-value pairs.
- **Columns:**
  - `setting_key` (String, PK): Unique key for the setting (e.g., "site_name"). `VARCHAR(100)`.
  - `setting_value` (Json?): Value of the setting, stored as JSON to support various data types. Nullable.
  - `description` (String?): Description of what the setting controls. Nullable.
  - `created_at` (DateTime): Timestamp of setting creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last setting update. Auto-updated. `TIMESTAMPTZ(6)`.

---

### **FAQ AND LEGAL DOCUMENT MODELS**

---

**20. Table: `FAQCategory`**

- **Purpose:** Organizes FAQ items into categories.
- **Columns:**
  - `category_id` (String, PK): Unique identifier for the FAQ category. Default: `uuid()`. `Uuid`.
  - `name` (String, Unique): Name of the FAQ category. `VARCHAR(150)`.
  - `slug` (String, Unique): URL-friendly slug for the FAQ category. `VARCHAR(150)`.
  - `description` (String?): Optional description of the category. Nullable.
  - `display_order` (Int): Order in which FAQ categories are displayed. Default: `0`.
  - `created_at` (DateTime): Timestamp of category creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last category update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Relationships:**
  - One-to-Many with `FAQItem`.

**21. Table: `FAQItem`**

- **Purpose:** Stores individual Frequently Asked Questions and their answers.
- **Columns:**
  - `item_id` (String, PK): Unique identifier for the FAQ item. Default: `uuid()`. `Uuid`.
  - `faq_category_id` (String, FK): ID of the FAQ category this item belongs to. `Uuid`.
  - `question` (String): The question text.
  - `answer` (String): The answer text.
  - `is_published` (Boolean): Flag to indicate if the FAQ item is visible. Default: `true`.
  - `display_order` (Int): Order of the item within its category. Default: `0`.
  - `tags` (String?): Comma-separated tags for searching/filtering FAQs. Nullable.
  - `created_at` (DateTime): Timestamp of item creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last item update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `faq_category_id` references `FAQCategory(category_id)`. On Delete: Cascade.
- **Indexes:**
  - `faq_category_id`
  - `is_published`

**22. Table: `LegalDocument`**

- **Purpose:** Stores information about legal documents (e.g., Terms of Service, Privacy Policy).
- **Columns:**
  - `id` (String, PK): Unique identifier for the legal document. Default: `uuid()`. `Uuid`.
  - `title` (String): Title of the legal document. `VARCHAR(255)`.
  - `slug` (String, Unique): URL-friendly slug for the document. `VARCHAR(100)`.
  - `description` (String?): Brief description of the document. Nullable.
  - `created_at` (DateTime): Timestamp of document record creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last document record update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Relationships:**
  - One-to-Many with `LegalDocumentVersion`.

**23. Table: `LegalDocumentVersion`**

- **Purpose:** Stores specific versions of a legal document, allowing for history and version control.
- **Columns:**
  - `id` (String, PK): Unique identifier for this version. Default: `uuid()`. `Uuid`.
  - `document_id` (String, FK): ID of the legal document this version belongs to. `Uuid`.
  - `version_number` (String): Version number (e.g., "1.0", "2.1.3"). `VARCHAR(20)`.
  - `content` (String): Full text content of this version of the document.
  - `status` (LegalDocumentVersionStatus): Status of this version (draft, published, archived). Default: `draft`.
  - `published_at` (DateTime?): Timestamp when this version was published. `TIMESTAMPTZ(6)`. Nullable.
  - `effective_date` (DateTime): Date when this version becomes effective. `Date`.
  - `change_summary` (String?): Summary of changes in this version compared to the previous one. Nullable.
  - `created_at` (DateTime): Timestamp of version creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last version update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `document_id` references `LegalDocument(id)`. On Delete: Cascade.
- **Unique Constraints:**
  - Composite (`document_id`, `version_number`).
- **Indexes:**
  - `status`

**24. Table: `ContactSubmission`**

- **Purpose:** Stores messages submitted through a contact form.
- **Columns:**
  - `submission_id` (String, PK): Unique identifier for the submission. Default: `uuid()`. `Uuid`.
  - `name` (String?): Name of the person submitting the form. `VARCHAR(255)`. Nullable.
  - `email` (String?): Email of the person. `VARCHAR(255)`. Nullable.
  - `subject` (String?): Subject of the message. `VARCHAR(255)`. Nullable.
  - `message` (String): Content of the message.
  - `ip_address` (String?): IP address of the submitter. `VARCHAR(45)`. Nullable.
  - `submitted_at` (DateTime): Timestamp of submission. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `is_read` (Boolean): Flag to indicate if the submission has been read by an admin. Default: `false`.
  - `status` (String?): Status of the submission (e.g., "new", "pending", "resolved"). `VARCHAR(50)`. Nullable.
  - `notes` (String?): Internal notes regarding the submission. Nullable.
  - `updated_at` (DateTime): Timestamp of last update to the submission record. Auto-updated. `TIMESTAMPTZ(6)`.
- **Indexes:**
  - `is_read`
  - `status`

---

### **COOKIE AND CONSENT MODELS**

---

**25. Table: `CookieCategory`**

- **Purpose:** Defines categories for cookies used on the site (e.g., "essential", "analytics", "marketing").
- **Columns:**
  - `id` (String, PK): Unique identifier for the cookie category. Default: `uuid()`. `Uuid`.
  - `slug` (String, Unique): URL-friendly slug for the category. `VARCHAR(50)`.
  - `name` (String): Display name of the category. `VARCHAR(100)`.
  - `description` (String): Description of the purpose of cookies in this category.
  - `is_essential` (Boolean): Flag if cookies in this category are essential for site functionality and cannot be disabled. Default: `false`.
  - `display_order` (Int): Order for displaying categories in consent banners. Default: `0`.
  - `created_at` (DateTime): Timestamp of category creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last category update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Relationships:**
  - One-to-Many with `CookieDefinition`.

**26. Table: `CookieDefinition`**

- **Purpose:** Stores details about specific cookies used on the site.
- **Columns:**
  - `id` (String, PK): Unique identifier for the cookie definition. Default: `uuid()`. `Uuid`.
  - `cookie_category_id` (String, FK): ID of the category this cookie belongs to. `Uuid`.
  - `name` (String): Name of the cookie (e.g., "\_ga"). `VARCHAR(100)`.
  - `provider` (String): Provider of the cookie (e.g., "Google Analytics", "SiteName"). `VARCHAR(100)`.
  - `purpose` (String): Description of what the cookie is used for.
  - `duration` (String): Lifespan of the cookie (e.g., "Session", "1 year"). `VARCHAR(50)`.
  - `created_at` (DateTime): Timestamp of definition creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last definition update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `cookie_category_id` references `CookieCategory(id)`. On Delete: Cascade.
- **Unique Constraints:**
  - Composite (`cookie_category_id`, `name`).

**27. Table: `UserCookieConsent`**

- **Purpose:** Records user consent choices for cookie categories.
- **Columns:**
  - `id` (String, PK): Unique identifier for the consent record. Default: `uuid()`. `Uuid`.
  - `user_id` (String?, FK): ID of the logged-in user, if applicable. `Uuid`. Nullable.
  - `anonymous_visitor_id` (String?, FK): Identifier for an anonymous visitor. `Uuid`. Nullable.
  - `consented_category_slugs` (Json?): JSON array of slugs of cookie categories the user has consented to. Nullable.
  - `consent_given_at` (DateTime): Timestamp when consent was first given/recorded. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `consent_last_updated_at` (DateTime): Timestamp when consent was last updated. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `consent_source` (String?): Source of consent (e.g., "cookie_banner", "profile_settings"). `VARCHAR(50)`. Nullable.
  - `ip_address` (String?): IP address at the time of consent. `VARCHAR(45)`. Nullable.
  - `user_agent` (String?): User agent string at the time of consent. Nullable.
  - `consent_version` (String?): Version of the consent policy/banner at the time of consent. `VARCHAR(20)`. Nullable.
- **Foreign Keys:**
  - `user_id` references `User(id)`. On Delete: Cascade.
- **Indexes:**
  - `user_id`
  - `anonymous_visitor_id`

---

### **ADVERTISEMENT AND AD TRACKING MODELS**

---

**28. Table: `Advertisement`**

- **Purpose:** Stores information about advertisements to be displayed.
- **Columns:**
  - `ad_id` (String, PK): Unique identifier for the advertisement. Default: `uuid()`. `Uuid`.
  - `advertiser_name` (String?): Name of the advertiser. Nullable.
  - `campaign_name` (String?): Name of the ad campaign. Nullable.
  - `ad_creative_url` (String?): URL to the ad creative (image/video). Nullable.
  - `ad_html_content` (String?): HTML content for complex ads. Nullable.
  - `landing_page_url` (String): URL the ad clicks through to.
  - `ad_type` (String): Type of ad (e.g., "banner", "video", "native"). `VARCHAR(50)`.
  - `dimensions` (String?): Dimensions of the ad (e.g., "300x250"). Nullable.
  - `targeting_criteria` (Json?): JSON object defining targeting rules (e.g., category, user segment). Nullable.
  - `start_date` (DateTime): Date and time when the ad should start displaying. `TIMESTAMPTZ(6)`.
  - `end_date` (DateTime?): Date and time when the ad should stop displaying. Nullable.
  - `is_active` (Boolean): Flag to indicate if the ad is currently active. Default: `true`.
  - `created_at` (DateTime): Timestamp of ad creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last ad update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Relationships:**
  - One-to-Many with `AdImpression`, `AdClick`.

**29. Table: `AdPlacement`**

- **Purpose:** Defines specific locations or slots on the website where ads can be placed.
- **Columns:**
  - `placement_id` (String, PK): Unique identifier for the ad placement. Default: `uuid()`. `Uuid`.
  - `description` (String?): Description of the placement (e.g., "Sidebar Top", "Below Article"). Nullable.
  - `allowed_ad_types` (Json?): JSON array of ad types allowed in this placement. Nullable.
  - `allowed_dimensions` (Json?): JSON array of ad dimensions allowed in this placement. Nullable.
  - `created_at` (DateTime): Timestamp of placement creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last placement update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Relationships:**
  - One-to-Many with `AdImpression`, `AdClick`.

**30. Table: `TrackingSession`**

- **Purpose:** Records a user's session on the website for analytics and tracking.
- **Columns:**
  - `session_id` (String, PK): Unique identifier for the tracking session. Default: `uuid()`. `Uuid`.
  - `user_id` (String?, FK): ID of the logged-in user, if applicable. `Uuid`. Nullable.
  - `anonymous_visitor_id` (String?, FK): Identifier for an anonymous visitor. `Uuid`. Nullable.
  - `start_timestamp` (DateTime): Timestamp when the session started. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `end_timestamp` (DateTime?): Timestamp when the session ended. Nullable.
  - `ip_address` (String?): IP address of the visitor. `VARCHAR(45)`. Nullable.
  - `user_agent` (String?): User agent string of the visitor's browser. Nullable.
  - `device_type` (String?): Type of device (e.g., "desktop", "mobile", "tablet"). `VARCHAR(50)`. Nullable.
  - `browser_name` (String?): Name of the browser. `VARCHAR(100)`. Nullable.
  - `os_name` (String?): Name of the operating system. `VARCHAR(100)`. Nullable.
  - `country_code` (String?): Two-letter country code (e.g., "US"). `VARCHAR(2)`. Nullable.
  - `region` (String?): Region or state. `VARCHAR(100)`. Nullable.
  - `city` (String?): City. `VARCHAR(100)`. Nullable.
  - `landing_page_url` (String?): URL of the first page visited in the session. Nullable.
  - `exit_page_url` (String?): URL of the last page visited before session end/exit. Nullable.
  - `utm_source` (String?): UTM source parameter. `VARCHAR(255)`. Nullable.
  - `utm_medium` (String?): UTM medium parameter. `VARCHAR(255)`. Nullable.
  - `utm_campaign` (String?): UTM campaign parameter. `VARCHAR(255)`. Nullable.
  - `utm_term` (String?): UTM term parameter. `VARCHAR(255)`. Nullable.
  - `utm_content` (String?): UTM content parameter. `VARCHAR(255)`. Nullable.
- **Foreign Keys:**
  - `user_id` references `User(id)`. On Delete: SetNull.
- **Indexes:**
  - `user_id`
  - `anonymous_visitor_id`
- **Relationships:**
  - One-to-Many with `TrackingEvent`, `AdImpression`, `AdClick`.

**31. Table: `TrackingEvent`**

- **Purpose:** Records specific events that occur during a tracking session (e.g., page view, button click).
- **Columns:**
  - `event_id` (String, PK): Unique identifier for the event. Default: `uuid()`. `Uuid`.
  - `session_id` (String, FK): ID of the tracking session this event belongs to. `Uuid`.
  - `user_id` (String?, FK): ID of the logged-in user, if applicable. `Uuid`. Nullable.
  - `anonymous_visitor_id` (String?): Identifier for an anonymous visitor. `Uuid`. Nullable.
  - `event_type` (String): Type of event (e.g., "page_view", "click", "form_submit"). `VARCHAR(100)`.
  - `event_timestamp` (DateTime): Timestamp when the event occurred. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `url` (String?): URL where the event occurred. Nullable.
  - `element_id` (String?): HTML ID or selector of the element involved in the event. `VARCHAR(255)`. Nullable.
  - `event_properties` (Json?): JSON object for additional event-specific data. Nullable.
  - `page_title` (String?): Title of the page where the event occurred. Nullable.
  - `referrer_url` (String?): Referrer URL for this event. Nullable.
- **Foreign Keys:**
  - `session_id` references `TrackingSession(session_id)`. On Delete: Cascade.
  - `user_id` references `User(id)`. On Delete: SetNull.
- **Indexes:**
  - `session_id`
  - `user_id`
  - `event_type`

**32. Table: `DeviceFingerprint`**

- **Purpose:** Stores device fingerprints to help identify unique anonymous visitors.
- **Columns:**
  - `fingerprint_id` (String, PK): Unique identifier for the fingerprint record. Default: `uuid()`. `Uuid`.
  - `user_id` (String?, FK): ID of the logged-in user, if associated. `Uuid`. Nullable.
  - `anonymous_visitor_id` (String?): Identifier for an anonymous visitor this fingerprint is associated with. `Uuid`. Nullable.
  - `fingerprint_hash` (String): The generated hash representing the device fingerprint.
  - `attributes` (Json): JSON object containing the attributes used to generate the fingerprint.
  - `first_seen_at` (DateTime): Timestamp when this fingerprint was first recorded. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `last_seen_at` (DateTime): Timestamp when this fingerprint was last seen/updated. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `ip_address` (String?): IP address associated with the fingerprint (can change). `VARCHAR(45)`. Nullable.
- **Foreign Keys:**
  - `user_id` references `User(id)`. On Delete: SetNull.
- **Unique Constraints:**
  - Composite (`fingerprint_hash`, `ip_address`) - _Note: IP address can make this less stable if IP changes often for same device. Consider if `fingerprint_hash` alone should be unique or if the composite key reflects a specific business rule._
- **Indexes:**
  - `user_id`
  - `anonymous_visitor_id`

**33. Table: `AdImpression`**

- **Purpose:** Records an instance of an ad being displayed (impression).
- **Columns:**
  - `impression_id` (String, PK): Unique identifier for the ad impression. Default: `uuid()`. `Uuid`.
  - `ad_id` (String, FK): ID of the advertisement that was displayed. `Uuid`.
  - `placement_id` (String, FK): ID of the ad placement where the ad was shown. `Uuid`.
  - `tracking_session_id` (String?, FK): ID of the tracking session during which the impression occurred. `Uuid`. Nullable.
  - `user_id` (String?, FK): ID of the logged-in user who saw the ad. `Uuid`. Nullable.
  - `anonymous_visitor_id` (String?): Identifier for an anonymous visitor who saw the ad. `Uuid`. Nullable.
  - `timestamp` (DateTime): Timestamp of the impression. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `page_url` (String?): URL of the page where the ad was impressed. Nullable.
  - `ip_address` (String?): IP address of the visitor. `VARCHAR(45)`. Nullable.
- **Foreign Keys:**
  - `ad_id` references `Advertisement(ad_id)`. On Delete: Cascade.
  - `placement_id` references `AdPlacement(placement_id)`. On Delete: Restrict.
  - `tracking_session_id` references `TrackingSession(session_id)`. On Delete: SetNull.
  - `user_id` references `User(id)`. On Delete: SetNull.
- **Indexes:**
  - `ad_id`
  - `placement_id`
  - `tracking_session_id`
  - `user_id`
- **Relationships:**
  - One-to-Many with `AdClick` (an impression can lead to multiple clicks, though typically one-to-one or zero). The `AdClick` has `impression_id @unique` which suggests a one-to-one.

**34. Table: `AdClick`**

- **Purpose:** Records an instance of an ad being clicked.
- **Columns:**
  - `click_id` (String, PK): Unique identifier for the ad click. Default: `uuid()`. `Uuid`.
  - `impression_id` (String?, FK, Unique): ID of the ad impression that led to this click. `Uuid`. Nullable.
  - `ad_id` (String, FK): ID of the advertisement that was clicked. `Uuid`.
  - `placement_id` (String, FK): ID of the ad placement where the ad was clicked. `Uuid`.
  - `tracking_session_id` (String?, FK): ID of the tracking session during which the click occurred. `Uuid`. Nullable.
  - `user_id` (String?, FK): ID of the logged-in user who clicked the ad. `Uuid`. Nullable.
  - `anonymous_visitor_id` (String?): Identifier for an anonymous visitor who clicked the ad. `Uuid`. Nullable.
  - `timestamp` (DateTime): Timestamp of the click. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `click_destination_url` (String?): Actual URL the user was taken to after the click (can differ from ad's landing page due to trackers). Nullable.
  - `ip_address` (String?): IP address of the visitor. `VARCHAR(45)`. Nullable.
- **Foreign Keys:**
  - `impression_id` references `AdImpression(impression_id)`. On Delete: SetNull.
  - `ad_id` references `Advertisement(ad_id)`. On Delete: Cascade.
  - `placement_id` references `AdPlacement(placement_id)`. On Delete: Restrict.
  - `tracking_session_id` references `TrackingSession(session_id)`. On Delete: SetNull.
  - `user_id` references `User(id)`. On Delete: SetNull.
- **Indexes:**
  - `ad_id`
  - `placement_id`
  - `tracking_session_id`
  - `user_id`

---

### **NOTIFICATION AND ACTIVITY LOG MODELS**

---

**35. Table: `Notification`**

- **Purpose:** Stores notifications to be displayed to users.
- **Columns:**
  - `notification_id` (String, PK): Unique identifier for the notification. Default: `uuid()`. `Uuid`.
  - `recipient_user_id` (String, FK): ID of the user who should receive the notification. `Uuid`.
  - `type` (String): Type of notification (e.g., "new_comment", "post_approved"). `VARCHAR(50)`.
  - `title` (String?): Optional title of the notification. `VARCHAR(255)`. Nullable.
  - `message` (String): Content of the notification message.
  - `link_url` (String?): URL the notification should link to. `VARCHAR(2048)`. Nullable.
  - `related_entity_type` (String?): Type of entity related to this notification (e.g., "Post", "Comment"). `VARCHAR(50)`. Nullable.
  - `related_entity_id` (String?): ID of the related entity. `Uuid`. Nullable.
  - `is_read` (Boolean): Flag to indicate if the user has read the notification. Default: `false`.
  - `read_at` (DateTime?): Timestamp when the notification was marked as read. Nullable.
  - `created_at` (DateTime): Timestamp of notification creation. Default: `now()`. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `recipient_user_id` references `User(id)`. On Delete: Cascade.
- **Indexes:**
  - `recipient_user_id`
  - `is_read`

**36. Table: `ActivityLog`**

- **Purpose:** Records significant actions performed by users or by the system.
- **Columns:**
  - `log_id` (String, PK): Unique identifier for the log entry. Default: `uuid()`. `Uuid`.
  - `user_id` (String?, FK): ID of the user who performed the action, if applicable. `Uuid`. Nullable.
  - `action_type` (String): Type of action performed (e.g., "user_login", "post_created", "settings_updated"). `VARCHAR(100)`.
  - `target_entity_type` (String?): Type of entity the action was performed on (e.g., "Post", "User"). `VARCHAR(50)`. Nullable.
  - `target_entity_id` (String?): ID of the target entity. `Uuid`. Nullable.
  - `details` (Json?): JSON object for additional details about the action. Nullable.
  - `ip_address` (String?): IP address from which the action was performed. `VARCHAR(45)`. Nullable.
  - `logged_at` (DateTime): Timestamp when the action was logged. Default: `now()`. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `user_id` references `User(id)`. On Delete: SetNull.
- **Indexes:**
  - `user_id`
  - `action_type`

---

### **UTILITY MODELS**

---

**37. Table: `Redirect`**

- **Purpose:** Manages URL redirects, typically for changed slugs or moved content.
- **Columns:**
  - `redirect_id` (String, PK): Unique identifier for the redirect rule. Default: `uuid()`. `Uuid`.
  - `old_slug` (String, Unique): The old URL slug that should be redirected. `VARCHAR(255)`.
  - `new_post_id` (String, FK): ID of the post the old slug should redirect to. `Uuid`.
  - `http_status_code` (Int): HTTP status code for the redirect (e.g., 301, 302). Default: `301`.
  - `created_at` (DateTime): Timestamp of redirect rule creation. Default: `now()`. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `new_post_id` references `Post(post_id)`. On Delete: Cascade.

**38. Table: `SchemaMarkup`**

- **Purpose:** Stores structured data markup (e.g., JSON-LD) for posts to enhance SEO.
- **Columns:**
  - `schema_markup_id` (String, PK): Unique identifier for the schema markup record. Default: `uuid()`. `Uuid`.
  - `post_id` (String, FK, Unique): ID of the post this schema markup applies to. `Uuid`.
  - `schema_type` (String): Type of schema (e.g., "Article", "Recipe", "Product"). `VARCHAR(100)`.
  - `json_ld_data` (Json): The JSON-LD structured data.
  - `created_at` (DateTime): Timestamp of record creation. Default: `now()`. `TIMESTAMPTZ(6)`.
  - `updated_at` (DateTime): Timestamp of last record update. Auto-updated. `TIMESTAMPTZ(6)`.
- **Foreign Keys:**
  - `post_id` references `Post(post_id)`. On Delete: Cascade.

---

## 4. Relationships & Foreign Keys

_(This section summarizes the relationships already detailed in each table description. Key relationships include:)_

- **User - centric relationships:**
  - `User` to `Account`, `Session`: Authentication and session management.
  - `User` to `Post` (as author): Content authorship.
  - `User` to `Comment`, `PostReview`: User-generated content.
  - `User` to `User_Category_Preference`, `UserProfileSegment`: Personalization.
  - `User` to `Notification`, `ActivityLog`: User engagement and auditing.
  - `User` to `MediaAsset` (as uploader): Media ownership.
  - `User` to `TrackingSession`, `TrackingEvent`, `DeviceFingerprint`: Analytics and user behavior tracking.
  - `User` to `AdImpression`, `AdClick`: Ad interaction tracking.
  - `User` to `UserCookieConsent`: Privacy consent.
- **Post - centric relationships:**
  - `Post` to `Category`, `Tag`: Content organization.
  - `Post` to `TableOfContentItem`, `ArticleImage`: Post structure and embedded media.
  - `Post` to `RelatedPost`: Content discovery.
  - `Post` to `SEO_Metadata`, `SchemaMarkup`: SEO enhancement.
  - `Post` to `Comment`, `PostReview`: User interaction on posts.
  - `Post` to `Redirect`: URL management.
- **Hierarchical Relationships:**
  - `Category` to `Category` (parent/child).
  - `Comment` to `Comment` (parent/reply).
  - `NavigationMenuItem` to `NavigationMenuItem` (parent/child).
- **Advertising & Tracking:**
  - `Advertisement`, `AdPlacement` link to `AdImpression` and `AdClick`.
  - `TrackingSession` links `User` or anonymous visitor to a series of `TrackingEvent`s, and also to ad interactions.
- **Consent Management:**
  - `CookieCategory` to `CookieDefinition`.
  - `UserCookieConsent` links `User` or anonymous visitor to consented categories.
- **Site Management:**
  - `LegalDocument` to `LegalDocumentVersion`.
  - `FAQCategory` to `FAQItem`.
  - `NavigationMenu` to `NavigationMenuItem`.

**Referential Integrity:**

- `onDelete: Cascade`: Deleting a parent record will delete related child records (e.g., deleting a `User` deletes their `Comment`s).
- `onDelete: SetNull`: Deleting a parent record will set the foreign key in child records to `NULL` (e.g., deleting a `User` (author) sets `author_id` in `Post` to `NULL`).
- `onDelete: Restrict`: Prevents deletion of a parent record if child records exist (e.g., `AdPlacement` cannot be deleted if `AdImpression`s refer to it).

---

## 5. Stored Procedures, Functions, & Triggers

- **None explicitly defined in the Prisma schema.**
- The `@default(now())` and `@updatedAt` attributes are handled by Prisma or the database to set timestamps.
- If any custom stored procedures, functions, or triggers are added directly to the PostgreSQL database, they should be documented here, including:
  - Name
  - Purpose
  - Input/Output parameters
  - Logic/Business rules implemented

---

## 6. Views

- **None explicitly defined in the Prisma schema.**
- If database views are created for reporting or simplifying complex queries, they should be documented here:
  - View Name
  - Definition (the `CREATE VIEW` SQL statement)
  - Purpose

---

## 7. Data Dictionary

- **Slug:** A URL-friendly version of a name or title, typically lowercase, with words separated by hyphens.
- **UUID (Universally Unique Identifier):** A 128-bit label used for unique identification.
- **Timestamptz:** Timestamp with time zone information.
- **JSON (JavaScript Object Notation):** A lightweight data-interchange format used for storing semi-structured data.
- **OAuth (Open Authorization):** An open standard for access delegation, commonly used for third-party logins.
- **SEO (Search Engine Optimization):** Practices to increase the quantity and quality of traffic to your website through organic search engine results.
- **OpenGraph:** A protocol that enables any web page to become a rich object in a social graph (used by Facebook, etc.).
- **Twitter Card:** Enables rich photo, video, and media experiences to be attached to Tweets.
- **JSON-LD (JSON for Linking Data):** A method of encoding Linked Data using JSON. Used for `SchemaMarkup`.
- **UTM Parameters (Urchin Tracking Module):** Tags added to URLs to track the effectiveness of online marketing campaigns.
- **Device Fingerprint:** A collection of information about a remote computing device for identification purposes.
- **Anonymous Visitor ID:** A unique identifier assigned to a visitor who is not logged in, to track their session and activities.
- **Essential Cookie:** A cookie that is strictly necessary for the website to function properly.
- **On Delete Cascade:** A referential integrity action where deleting a referenced row also deletes all referencing rows.
- **On Delete SetNull:** A referential integrity action where deleting a referenced row sets the foreign key column(s) in referencing rows to NULL.
- **On Delete Restrict:** A referential integrity action that prevents deleting a referenced row if any referencing rows exist.
- **Enums:**
  - `UserRole`: Defines user permissions levels (subscriber, business_user, admin, editor, author_role, guest, standard).
  - `LegalDocumentVersionStatus`: Defines the lifecycle state of a legal document version (draft, published, archived).

---

## 8. Security and Access Controls

- **User Roles:** The `User.role` field (enum `UserRole`) is the primary mechanism for role-based access control (RBAC) at the application level. The specific permissions for each role (e.g., `admin`, `editor`, `subscriber`) must be enforced by the application logic.
- **Authentication:** Handled via `Account` (OAuth) and `Session` tables. Sensitive tokens (`refresh_token`, `access_token`) are stored and should be protected. `VerificationToken` supports secure email verification and password resets.
- **Sensitive Data:**
  - `User`: `email`, `refresh_token` (in `Account`), `access_token` (in `Account`), `bio`, `social_media_links`.
  - `TrackingSession`, `TrackingEvent`, `DeviceFingerprint`, `ContactSubmission`: `ip_address`, `user_agent`, potentially PII in URLs or properties.
  - `UserCookieConsent`: `ip_address`, `user_agent`.
  - Application logic must ensure appropriate protection (e.g., encryption at rest for highly sensitive fields if required, proper access controls).
- **Data Integrity:** Foreign key constraints, unique constraints, and `NOT NULL` constraints help maintain data integrity.
- **Prisma Client:** The application will primarily interact with the database via the Prisma Client, which helps prevent SQL injection vulnerabilities if used correctly.
- **Database Level Security:** Standard PostgreSQL security measures should be in place (strong passwords, limited network access, user privileges).

---

## 9. Backup and Maintenance Procedures

- **Backup Schedule:**
  - Regular automated backups are crucial. PostgreSQL's `pg_dump` or cloud provider solutions should be used.
  - Frequency: Daily full backups are recommended, with more frequent transaction log backups (e.g., every 1-4 hours) to enable Point-In-Time Recovery (PITR).
  - Retention: Define a retention policy based on business needs (e.g., 30 days of daily backups, 12 monthly backups, 1 yearly backup).
  - Testing: Regularly test backup restoration procedures.
- **Index Maintenance:**
  - Periodically monitor index usage and fragmentation.
  - Rebuild or reindex indexes as needed to maintain query performance using `REINDEX`.
  - PostgreSQL's `VACUUM` (especially `AUTOVACUUM`) is essential for reclaiming storage and preventing table/index bloat. `VACUUM FULL` might be needed occasionally but requires exclusive locks.
- **Performance Monitoring:**
  - Monitor query performance, disk space, CPU, and memory usage.
  - Use tools like `pg_stat_statements` to identify slow or frequently run queries.
- **Prisma Migrations:** Schema changes are managed using Prisma Migrate. Keep migration files version-controlled.
- **Shadow Database:** The `shadowDatabaseUrl` is used by Prisma Migrate to safely generate and check new migrations.

---

## 10. Change History / Versioning

- **Version 1.0 (June 3, 2025):**
  - Initial documentation based on the provided Prisma schema.
  - Covers all models, fields, relationships, and indexes present in the schema.
- _(Future versions would document significant schema changes, additions of stored procedures, views, or major modifications to business logic reflected in the database structure.)_

---

## 11. Sample Queries

_(These are conceptual SQL queries. Actual syntax might vary slightly or be generated by Prisma Client.)_

1.  **Get all published posts in a specific category with author name:**

    ```sql
    SELECT p.title, p.slug, p.excerpt, u.name AS author_name
    FROM "Post" p
    JOIN "User" u ON p.author_id = u.id
    JOIN "Category" c ON p.category_id = c.category_id
    WHERE c.slug = 'tech-news' AND p.is_featured = false; -- Assuming is_featured might differentiate from general published status or you have another status field.
    ```

2.  **Get the 5 most recent comments for a specific post:**

    ```sql
    SELECT c.comment_text, u.name AS commenter_name, c.created_at
    FROM "Comment" c
    JOIN "User" u ON c.user_id = u.id
    WHERE c.post_id = (SELECT post_id FROM "Post" WHERE slug = 'my-article-slug') AND c.is_approved = true
    ORDER BY c.created_at DESC
    LIMIT 5;
    ```

3.  **Count active users per role:**

    ```sql
    SELECT role, COUNT(id) AS user_count
    FROM "User"
    -- Add any condition for 'active' if defined (e.g., email_verified IS NOT NULL)
    GROUP BY role
    ORDER BY user_count DESC;
    ```

4.  **Find all posts tagged with 'prisma' and 'typescript':**

    ```sql
    SELECT p.title, p.slug
    FROM "Post" p
    JOIN "_PostToTag" ptt ON p.post_id = ptt."A" -- Prisma's implicit join table convention
    JOIN "Tag" t ON ptt."B" = t.tag_id
    WHERE t.name IN ('prisma', 'typescript')
    GROUP BY p.post_id, p.title, p.slug
    HAVING COUNT(DISTINCT t.name) = 2;
    ```

5.  **Get a user's cookie consent preferences for specific categories:**

    ```sql
    SELECT consented_category_slugs
    FROM "UserCookieConsent"
    WHERE user_id = 'user-uuid-here';
    -- Application logic would parse the JSON `consented_category_slugs`
    ```

6.  **Find top 10 posts by view count in the last 30 days:**

    ```sql
    SELECT post_id, title, view_count
    FROM "Post"
    WHERE created_at >= NOW() - INTERVAL '30 days' -- Or if view_count is updated on view, this condition might not be needed
    ORDER BY view_count DESC
    LIMIT 10;
    ```

7.  **Get all published legal document versions:**
    ```sql
    SELECT ld.title AS document_title, ldv.version_number, ldv.effective_date
    FROM "LegalDocumentVersion" ldv
    JOIN "LegalDocument" ld ON ldv.document_id = ld.id
    WHERE ldv.status = 'published'
    ORDER BY ld.title, ldv.effective_date DESC;
    ```

---
