erDiagram
    User {
        String id PK
        String name
        String email
        DateTime email_verified
        String image
        String role
        String author_slug
        String bio
        Json social_media_links
        DateTime created_at
        DateTime updated_at
    }
    Post {
        String post_id PK
        String title
        String slug
        String keywords
        String main_photo_url
        String main_photo_alt
        String excerpt
        String article_content
        Boolean is_featured
        String category_id
        String author_id
        Int view_count
        Float average_rating
        Int review_count
        DateTime created_at
        DateTime updated_at
    }
    Category {
        String category_id PK
        String name
        String slug
        String parent_category_id
        DateTime created_at
        DateTime updated_at
    }
    User ||--o{ Post : "author"
    Post ||--o{ Comment : "has"
    Post ||--o{ PostReview : "receives"
    Post ||--o{ Tag : "tagged with"
    User ||--o{ User_Category_Preference : "prefers"
    Category ||--o{ Post : "contains"