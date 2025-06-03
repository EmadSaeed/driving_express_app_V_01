erDiagram
    User {
        String id PK
        String name
        String email
        String role
        DateTime created_at
    }
    Post {
        String post_id PK
        String title
        String content
        String author_id FK
        DateTime created_at
    }
    Comment {
        String comment_id PK
        String post_id FK
        String user_id FK
        String content
        DateTime created_at
    }
    Category {
        String category_id PK
        String name
    }
    
    User ||--o{ Post : "writes"
    User ||--o{ Comment : "comments on"
    Post ||--o{ Comment : "has"
    Post ||--o{ Category : "belongs to"