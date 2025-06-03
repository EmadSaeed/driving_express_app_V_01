-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('subscriber', 'business_user', 'admin', 'editor', 'author_role', 'guest', 'standard');

-- CreateEnum
CREATE TYPE "LegalDocumentVersionStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMPTZ(6),
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'standard',
    "author_slug" TEXT,
    "bio" TEXT,
    "social_media_links" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","provider_account_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "session_token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_token")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "User_Category_Preference" (
    "user_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "preference_set_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Category_Preference_pkey" PRIMARY KEY ("user_id","category_id")
);

-- CreateTable
CREATE TABLE "UserProfileSegment" (
    "user_id" UUID NOT NULL,
    "segment_slug" VARCHAR(100) NOT NULL,
    "assigned_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confidence_score" DOUBLE PRECISION,

    CONSTRAINT "UserProfileSegment_pkey" PRIMARY KEY ("user_id","segment_slug")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "parent_category_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tag_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "Post" (
    "post_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "keywords" TEXT,
    "main_photo_url" VARCHAR(255),
    "main_photo_alt" VARCHAR(255),
    "excerpt" TEXT,
    "article_content" TEXT NOT NULL,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "category_id" UUID,
    "author_id" UUID,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "average_rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "TableOfContentItem" (
    "toc_item_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "item_html_id" VARCHAR(100) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "display_order" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TableOfContentItem_pkey" PRIMARY KEY ("toc_item_id")
);

-- CreateTable
CREATE TABLE "ArticleImage" (
    "article_image_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "alt_text" VARCHAR(255),
    "display_order" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleImage_pkey" PRIMARY KEY ("article_image_id")
);

-- CreateTable
CREATE TABLE "RelatedPost" (
    "post_id_1" UUID NOT NULL,
    "post_id_2" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RelatedPost_pkey" PRIMARY KEY ("post_id_1","post_id_2")
);

-- CreateTable
CREATE TABLE "SEO_Metadata" (
    "seo_metadata_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "meta_title" VARCHAR(255),
    "meta_description" TEXT,
    "meta_keywords" TEXT,
    "canonical_url" VARCHAR(255),
    "opengraph_title" VARCHAR(255),
    "opengraph_description" TEXT,
    "opengraph_image_url" VARCHAR(255),
    "twitter_card_type" VARCHAR(50),
    "twitter_title" VARCHAR(255),
    "twitter_description" TEXT,
    "twitter_image_url" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "SEO_Metadata_pkey" PRIMARY KEY ("seo_metadata_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "comment_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "parent_comment_id" UUID,
    "comment_text" TEXT NOT NULL,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "PostReview" (
    "review_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "rating_value" SMALLINT NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "is_approved" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "PostReview_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "asset_id" UUID NOT NULL,
    "uploader_user_id" UUID,
    "file_name_original" VARCHAR(255) NOT NULL,
    "file_name_stored" VARCHAR(255) NOT NULL,
    "file_type" VARCHAR(100) NOT NULL,
    "file_size_bytes" BIGINT NOT NULL,
    "storage_path" VARCHAR(1024) NOT NULL,
    "public_url" VARCHAR(2048),
    "alt_text" VARCHAR(255),
    "caption" TEXT,
    "dimensions" JSONB,
    "metadata" JSONB,
    "uploaded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("asset_id")
);

-- CreateTable
CREATE TABLE "NavigationMenu" (
    "menu_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "NavigationMenu_pkey" PRIMARY KEY ("menu_id")
);

-- CreateTable
CREATE TABLE "NavigationMenuItem" (
    "item_id" UUID NOT NULL,
    "menu_id" UUID NOT NULL,
    "parent_item_id" UUID,
    "title" VARCHAR(100) NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "target" VARCHAR(20),
    "icon_class" VARCHAR(100),
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "NavigationMenuItem_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "setting_key" VARCHAR(100) NOT NULL,
    "setting_value" JSONB,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("setting_key")
);

-- CreateTable
CREATE TABLE "FAQCategory" (
    "category_id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "FAQCategory_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "FAQItem" (
    "item_id" UUID NOT NULL,
    "faq_category_id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "FAQItem_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "LegalDocument" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "LegalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalDocumentVersion" (
    "id" UUID NOT NULL,
    "document_id" UUID NOT NULL,
    "version_number" VARCHAR(20) NOT NULL,
    "content" TEXT NOT NULL,
    "status" "LegalDocumentVersionStatus" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMPTZ(6),
    "effective_date" DATE NOT NULL,
    "change_summary" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "LegalDocumentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "submission_id" UUID NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "subject" VARCHAR(255),
    "message" TEXT NOT NULL,
    "ip_address" VARCHAR(45),
    "submitted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "status" VARCHAR(50),
    "notes" TEXT,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("submission_id")
);

-- CreateTable
CREATE TABLE "CookieCategory" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "is_essential" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CookieCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CookieDefinition" (
    "id" UUID NOT NULL,
    "cookie_category_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "provider" VARCHAR(100) NOT NULL,
    "purpose" TEXT NOT NULL,
    "duration" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CookieDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCookieConsent" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "anonymous_visitor_id" UUID,
    "consented_category_slugs" JSONB,
    "consent_given_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consent_last_updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consent_source" VARCHAR(50),
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "consent_version" VARCHAR(20),

    CONSTRAINT "UserCookieConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "ad_id" UUID NOT NULL,
    "advertiser_name" TEXT,
    "campaign_name" TEXT,
    "ad_creative_url" TEXT,
    "ad_html_content" TEXT,
    "landing_page_url" TEXT NOT NULL,
    "ad_type" VARCHAR(50) NOT NULL,
    "dimensions" TEXT,
    "targeting_criteria" JSONB,
    "start_date" TIMESTAMPTZ(6) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Advertisement_pkey" PRIMARY KEY ("ad_id")
);

-- CreateTable
CREATE TABLE "AdPlacement" (
    "placement_id" UUID NOT NULL,
    "description" TEXT,
    "allowed_ad_types" JSONB,
    "allowed_dimensions" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "AdPlacement_pkey" PRIMARY KEY ("placement_id")
);

-- CreateTable
CREATE TABLE "TrackingSession" (
    "session_id" UUID NOT NULL,
    "user_id" UUID,
    "anonymous_visitor_id" UUID,
    "start_timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_timestamp" TIMESTAMP(3),
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "device_type" VARCHAR(50),
    "browser_name" VARCHAR(100),
    "os_name" VARCHAR(100),
    "country_code" VARCHAR(2),
    "region" VARCHAR(100),
    "city" VARCHAR(100),
    "landing_page_url" TEXT,
    "exit_page_url" TEXT,
    "utm_source" VARCHAR(255),
    "utm_medium" VARCHAR(255),
    "utm_campaign" VARCHAR(255),
    "utm_term" VARCHAR(255),
    "utm_content" VARCHAR(255),

    CONSTRAINT "TrackingSession_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "TrackingEvent" (
    "event_id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "user_id" UUID,
    "anonymous_visitor_id" UUID,
    "event_type" VARCHAR(100) NOT NULL,
    "event_timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,
    "element_id" VARCHAR(255),
    "event_properties" JSONB,
    "page_title" TEXT,
    "referrer_url" TEXT,

    CONSTRAINT "TrackingEvent_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "DeviceFingerprint" (
    "fingerprint_id" UUID NOT NULL,
    "user_id" UUID,
    "anonymous_visitor_id" UUID,
    "fingerprint_hash" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,
    "first_seen_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" VARCHAR(45),

    CONSTRAINT "DeviceFingerprint_pkey" PRIMARY KEY ("fingerprint_id")
);

-- CreateTable
CREATE TABLE "AdImpression" (
    "impression_id" UUID NOT NULL,
    "ad_id" UUID NOT NULL,
    "placement_id" UUID NOT NULL,
    "tracking_session_id" UUID,
    "user_id" UUID,
    "anonymous_visitor_id" UUID,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page_url" TEXT,
    "ip_address" VARCHAR(45),

    CONSTRAINT "AdImpression_pkey" PRIMARY KEY ("impression_id")
);

-- CreateTable
CREATE TABLE "AdClick" (
    "click_id" UUID NOT NULL,
    "impression_id" UUID,
    "ad_id" UUID NOT NULL,
    "placement_id" UUID NOT NULL,
    "tracking_session_id" UUID,
    "user_id" UUID,
    "anonymous_visitor_id" UUID,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "click_destination_url" TEXT,
    "ip_address" VARCHAR(45),

    CONSTRAINT "AdClick_pkey" PRIMARY KEY ("click_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notification_id" UUID NOT NULL,
    "recipient_user_id" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255),
    "message" TEXT NOT NULL,
    "link_url" VARCHAR(2048),
    "related_entity_type" VARCHAR(50),
    "related_entity_id" UUID,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "log_id" UUID NOT NULL,
    "user_id" UUID,
    "action_type" VARCHAR(100) NOT NULL,
    "target_entity_type" VARCHAR(50),
    "target_entity_id" UUID,
    "details" JSONB,
    "ip_address" VARCHAR(45),
    "logged_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "Redirect" (
    "redirect_id" UUID NOT NULL,
    "old_slug" VARCHAR(255) NOT NULL,
    "new_post_id" UUID NOT NULL,
    "http_status_code" INTEGER NOT NULL DEFAULT 301,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Redirect_pkey" PRIMARY KEY ("redirect_id")
);

-- CreateTable
CREATE TABLE "SchemaMarkup" (
    "schema_markup_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "schema_type" VARCHAR(100) NOT NULL,
    "json_ld_data" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "SchemaMarkup_pkey" PRIMARY KEY ("schema_markup_id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PostToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_author_slug_key" ON "User"("author_slug");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_user_id_idx" ON "Account"("user_id");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE INDEX "User_Category_Preference_category_id_idx" ON "User_Category_Preference"("category_id");

-- CreateIndex
CREATE INDEX "UserProfileSegment_segment_slug_idx" ON "UserProfileSegment"("segment_slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_parent_category_id_idx" ON "Category"("parent_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_category_id_idx" ON "Post"("category_id");

-- CreateIndex
CREATE INDEX "Post_author_id_idx" ON "Post"("author_id");

-- CreateIndex
CREATE INDEX "Post_is_featured_idx" ON "Post"("is_featured");

-- CreateIndex
CREATE INDEX "Post_created_at_idx" ON "Post"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "TableOfContentItem_post_id_item_html_id_key" ON "TableOfContentItem"("post_id", "item_html_id");

-- CreateIndex
CREATE INDEX "ArticleImage_post_id_idx" ON "ArticleImage"("post_id");

-- CreateIndex
CREATE INDEX "RelatedPost_post_id_2_idx" ON "RelatedPost"("post_id_2");

-- CreateIndex
CREATE UNIQUE INDEX "SEO_Metadata_post_id_key" ON "SEO_Metadata"("post_id");

-- CreateIndex
CREATE INDEX "Comment_post_id_idx" ON "Comment"("post_id");

-- CreateIndex
CREATE INDEX "Comment_user_id_idx" ON "Comment"("user_id");

-- CreateIndex
CREATE INDEX "Comment_parent_comment_id_idx" ON "Comment"("parent_comment_id");

-- CreateIndex
CREATE INDEX "PostReview_post_id_idx" ON "PostReview"("post_id");

-- CreateIndex
CREATE INDEX "PostReview_user_id_idx" ON "PostReview"("user_id");

-- CreateIndex
CREATE INDEX "PostReview_is_approved_idx" ON "PostReview"("is_approved");

-- CreateIndex
CREATE UNIQUE INDEX "PostReview_post_id_user_id_key" ON "PostReview"("post_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_file_name_stored_key" ON "MediaAsset"("file_name_stored");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_public_url_key" ON "MediaAsset"("public_url");

-- CreateIndex
CREATE INDEX "MediaAsset_uploader_user_id_idx" ON "MediaAsset"("uploader_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "NavigationMenu_name_key" ON "NavigationMenu"("name");

-- CreateIndex
CREATE INDEX "NavigationMenuItem_menu_id_idx" ON "NavigationMenuItem"("menu_id");

-- CreateIndex
CREATE INDEX "NavigationMenuItem_parent_item_id_idx" ON "NavigationMenuItem"("parent_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "FAQCategory_name_key" ON "FAQCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FAQCategory_slug_key" ON "FAQCategory"("slug");

-- CreateIndex
CREATE INDEX "FAQItem_faq_category_id_idx" ON "FAQItem"("faq_category_id");

-- CreateIndex
CREATE INDEX "FAQItem_is_published_idx" ON "FAQItem"("is_published");

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocument_slug_key" ON "LegalDocument"("slug");

-- CreateIndex
CREATE INDEX "LegalDocumentVersion_status_idx" ON "LegalDocumentVersion"("status");

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocumentVersion_document_id_version_number_key" ON "LegalDocumentVersion"("document_id", "version_number");

-- CreateIndex
CREATE INDEX "ContactSubmission_is_read_idx" ON "ContactSubmission"("is_read");

-- CreateIndex
CREATE INDEX "ContactSubmission_status_idx" ON "ContactSubmission"("status");

-- CreateIndex
CREATE UNIQUE INDEX "CookieCategory_slug_key" ON "CookieCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CookieDefinition_cookie_category_id_name_key" ON "CookieDefinition"("cookie_category_id", "name");

-- CreateIndex
CREATE INDEX "UserCookieConsent_user_id_idx" ON "UserCookieConsent"("user_id");

-- CreateIndex
CREATE INDEX "UserCookieConsent_anonymous_visitor_id_idx" ON "UserCookieConsent"("anonymous_visitor_id");

-- CreateIndex
CREATE INDEX "TrackingSession_user_id_idx" ON "TrackingSession"("user_id");

-- CreateIndex
CREATE INDEX "TrackingSession_anonymous_visitor_id_idx" ON "TrackingSession"("anonymous_visitor_id");

-- CreateIndex
CREATE INDEX "TrackingEvent_session_id_idx" ON "TrackingEvent"("session_id");

-- CreateIndex
CREATE INDEX "TrackingEvent_user_id_idx" ON "TrackingEvent"("user_id");

-- CreateIndex
CREATE INDEX "TrackingEvent_event_type_idx" ON "TrackingEvent"("event_type");

-- CreateIndex
CREATE INDEX "DeviceFingerprint_user_id_idx" ON "DeviceFingerprint"("user_id");

-- CreateIndex
CREATE INDEX "DeviceFingerprint_anonymous_visitor_id_idx" ON "DeviceFingerprint"("anonymous_visitor_id");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceFingerprint_fingerprint_hash_ip_address_key" ON "DeviceFingerprint"("fingerprint_hash", "ip_address");

-- CreateIndex
CREATE INDEX "AdImpression_ad_id_idx" ON "AdImpression"("ad_id");

-- CreateIndex
CREATE INDEX "AdImpression_placement_id_idx" ON "AdImpression"("placement_id");

-- CreateIndex
CREATE INDEX "AdImpression_tracking_session_id_idx" ON "AdImpression"("tracking_session_id");

-- CreateIndex
CREATE INDEX "AdImpression_user_id_idx" ON "AdImpression"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdClick_impression_id_key" ON "AdClick"("impression_id");

-- CreateIndex
CREATE INDEX "AdClick_ad_id_idx" ON "AdClick"("ad_id");

-- CreateIndex
CREATE INDEX "AdClick_placement_id_idx" ON "AdClick"("placement_id");

-- CreateIndex
CREATE INDEX "AdClick_tracking_session_id_idx" ON "AdClick"("tracking_session_id");

-- CreateIndex
CREATE INDEX "AdClick_user_id_idx" ON "AdClick"("user_id");

-- CreateIndex
CREATE INDEX "Notification_recipient_user_id_idx" ON "Notification"("recipient_user_id");

-- CreateIndex
CREATE INDEX "Notification_is_read_idx" ON "Notification"("is_read");

-- CreateIndex
CREATE INDEX "ActivityLog_user_id_idx" ON "ActivityLog"("user_id");

-- CreateIndex
CREATE INDEX "ActivityLog_action_type_idx" ON "ActivityLog"("action_type");

-- CreateIndex
CREATE UNIQUE INDEX "Redirect_old_slug_key" ON "Redirect"("old_slug");

-- CreateIndex
CREATE UNIQUE INDEX "SchemaMarkup_post_id_key" ON "SchemaMarkup"("post_id");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Category_Preference" ADD CONSTRAINT "User_Category_Preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Category_Preference" ADD CONSTRAINT "User_Category_Preference_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileSegment" ADD CONSTRAINT "UserProfileSegment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableOfContentItem" ADD CONSTRAINT "TableOfContentItem_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleImage" ADD CONSTRAINT "ArticleImage_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedPost" ADD CONSTRAINT "RelatedPost_post_id_1_fkey" FOREIGN KEY ("post_id_1") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedPost" ADD CONSTRAINT "RelatedPost_post_id_2_fkey" FOREIGN KEY ("post_id_2") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SEO_Metadata" ADD CONSTRAINT "SEO_Metadata_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "Comment"("comment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReview" ADD CONSTRAINT "PostReview_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReview" ADD CONSTRAINT "PostReview_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_uploader_user_id_fkey" FOREIGN KEY ("uploader_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavigationMenuItem" ADD CONSTRAINT "NavigationMenuItem_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "NavigationMenu"("menu_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavigationMenuItem" ADD CONSTRAINT "NavigationMenuItem_parent_item_id_fkey" FOREIGN KEY ("parent_item_id") REFERENCES "NavigationMenuItem"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FAQItem" ADD CONSTRAINT "FAQItem_faq_category_id_fkey" FOREIGN KEY ("faq_category_id") REFERENCES "FAQCategory"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalDocumentVersion" ADD CONSTRAINT "LegalDocumentVersion_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookieDefinition" ADD CONSTRAINT "CookieDefinition_cookie_category_id_fkey" FOREIGN KEY ("cookie_category_id") REFERENCES "CookieCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCookieConsent" ADD CONSTRAINT "UserCookieConsent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingSession" ADD CONSTRAINT "TrackingSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingEvent" ADD CONSTRAINT "TrackingEvent_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "TrackingSession"("session_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingEvent" ADD CONSTRAINT "TrackingEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceFingerprint" ADD CONSTRAINT "DeviceFingerprint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdImpression" ADD CONSTRAINT "AdImpression_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "Advertisement"("ad_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdImpression" ADD CONSTRAINT "AdImpression_placement_id_fkey" FOREIGN KEY ("placement_id") REFERENCES "AdPlacement"("placement_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdImpression" ADD CONSTRAINT "AdImpression_tracking_session_id_fkey" FOREIGN KEY ("tracking_session_id") REFERENCES "TrackingSession"("session_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdImpression" ADD CONSTRAINT "AdImpression_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdClick" ADD CONSTRAINT "AdClick_impression_id_fkey" FOREIGN KEY ("impression_id") REFERENCES "AdImpression"("impression_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdClick" ADD CONSTRAINT "AdClick_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "Advertisement"("ad_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdClick" ADD CONSTRAINT "AdClick_placement_id_fkey" FOREIGN KEY ("placement_id") REFERENCES "AdPlacement"("placement_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdClick" ADD CONSTRAINT "AdClick_tracking_session_id_fkey" FOREIGN KEY ("tracking_session_id") REFERENCES "TrackingSession"("session_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdClick" ADD CONSTRAINT "AdClick_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipient_user_id_fkey" FOREIGN KEY ("recipient_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redirect" ADD CONSTRAINT "Redirect_new_post_id_fkey" FOREIGN KEY ("new_post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemaMarkup" ADD CONSTRAINT "SchemaMarkup_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;
