import { PrismaClient, Prisma } from "../app/generated/prisma";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  // ---- Categories ----
  const categories = [
    {
      category_id: uuidv4(),
      name: "Learner Hub",
      slug: "learner-hub",
      parent_category_id: null,
    },
    {
      category_id: uuidv4(),
      name: "Learn to drive",
      slug: "learn-to-drive",
      parent_category_id: null,
    },
    {
      category_id: uuidv4(),
      name: "Driving Test",
      slug: "driving-test",
      parent_category_id: null,
    },
    {
      category_id: uuidv4(),
      name: "Instructor Advice",
      slug: "instructor-advice",
      parent_category_id: null,
    },
  ];

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  // ---- Tags ----
  const tags = [
    { tag_id: uuidv4(), name: "Beginner" },
    { tag_id: uuidv4(), name: "Practical" },
    { tag_id: uuidv4(), name: "Theory" },
    { tag_id: uuidv4(), name: "Tips" },
  ];
  await prisma.tag.createMany({
    data: tags,
    skipDuplicates: true,
  });

  // ---- Posts ----
  const posts = [
    {
      title: "What are show me, tell me questions?",
      slug: "show-me-tell-me-questions",
      keywords: "driving, instructor",
      main_photo_url: "/images/photo-1.jpg",
      main_photo_alt: "image-alt-text",
      excerpt:
        "Qratione eum exercitationem fuga illo, temporibus quia enim, veritatis a minus dolores? Lorem ipsum dolor sit amet...",
      article_content: `<h2 id="moving-off" class='articleSubheading'>Moving off from the side of the road</h2>
                            <p class='articleParagraph'>
                                Clutch down fully and into 1st gear, occasionally 2nd if on a steep downwards hill.
                                <br />Apply the gas, usually about the thickness of a £1 coin, so that the engine  begins to rev slightly. If you have a rev counter, use this to help you. Press the gas enough so that it’s just over 1 to 1 and a 1/2 on the rev counter for most cars.
                                <br />Now bring the clutch up slowly to its  biting point: this is the point when you will feel a slight tug at the  front of the bonnet of your car.
                                <br />At this point, hold your left foot still and keep you right foot on the gas slightly too.
                                <br />You have now prepared the car to pull away. The car wants to move off, but  you still have your handbrake on which will be locking the two back  wheels.
                            </p>
                            <h2 id="observe-and-manoeuvre" class='articleSubheading'>Observe and Manoeuvre</h2>
                            <p class='articleParagraph'>
                                Once you have looked over your right shoulder and you are sure it’s safe to move off, you will need to release your handbrake.
                                <br />Once you have released your handbrake, you will need to gradually increase  your gas, whilst gradually bringing the clutch up slowly. It is  important that you co-ordinate these two pedals together.
                                <br />As the  car begins to move forwards, you will need to pull the steering wheel  slightly right to come away from the kerb. Ask your instructor for a  focal point when you are driving so that you can position your vehicle a good distance from the kerb. Alternatively, glance in both of your door mirrors and the gap on both sides of your vehicle (kerb and white  lines) should appear equal.
                                <br />Remember to cancel your signal if it’s still on, as other road users might find it misleading.
                            </p>
                            <h2 id="tips" class='articleSubheading'>Tips</h2>
                            <p class='articleParagraph'>
                                Stalling: This is usually a clutch control issue.  Are you in a petrol or diesel car? If petrol, you will require enough  gas so that you can hear the car revving before finding your biting  point. If you try to find the biting point first without gas, there is a higher risk you may stall.
                                <br />The gas should always be set first;  however, in a diesel it is usually easier and more forgiving to move  away if you have forgotten to set the gas.
                                <br />Just as the car begins  to move, pupils often release the clutch up quickly and fully. This  could be another reason why you are stalling.
                                <br />Try this: Just as the car begins to move, ease the clutch up over the course of 3 seconds. Count to 3 in your head. As you gradually bring the clutch up, don’t forget to gradually increase the gas. You should be co-ordinating the two pedals at the same time.
                            </p>`, // (use your dummy's article string here)
      is_featured: true,
      category_slug: "learn-to-drive",
      created_at: new Date("2024-01-01T10:00:00Z"),
      updated_at: new Date("2024-01-01T10:00:00Z"),
      toc: [
        {
          item_html_id: "moving-off",
          title: "Moving off from the side of the road",
          display_order: 1,
        },
        {
          item_html_id: "observe-and-manoeuvre",
          title: "Observe and Manoeuvre",
          display_order: 2,
        },
        { item_html_id: "tips", title: "Tips", display_order: 3 },
      ],
      article_images: [
        {
          image_url: "/images/a-img-1.jpg",
          alt_text: "a-img-1.jpg",
          display_order: 1,
        },
        {
          image_url: "/images/a-img-2.jpg",
          alt_text: "a-img-2.jpg",
          display_order: 2,
        },
        {
          image_url: "/images/a-img-3.jpg",
          alt_text: "a-img-3.jpg",
          display_order: 3,
        },
      ],
      tags: [0, 1],
      relatedPosts: [1, 2, 3, 7, 9], // index-based, will resolve to post_id after creation
    },
    // -- More posts below (keep it simple for others, see your dummy for inspiration)
  ];

  // Fill up with dummy posts if you want exactly 10
  while (posts.length < 10) {
    posts.push({
      title: `Post ${posts.length + 1} Title`,
      slug: `post-${posts.length + 1}`,
      keywords: "",
      main_photo_url: `/images/photo-${posts.length + 1}.jpg`,
      main_photo_alt: "image-alt-text",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      article_content: "<h2>Dummy Content</h2>",
      is_featured: true,
      category_slug: "learn-to-drive",
      created_at: new Date("2024-01-01T10:00:00Z"),
      updated_at: new Date("2024-01-01T10:00:00Z"),
      toc: [],
      article_images: [],
      tags: [posts.length % 4], // cycle tags
      relatedPosts: [],
    });
  }

  // ---- Insert Posts & Related Data ----
  const categorySlugToId = Object.fromEntries(
    categories.map((c) => [c.slug, c.category_id])
  );
  const tagIds = tags.map((t) => t.tag_id);

  const createdPostIds: string[] = [];

  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const post_id = uuidv4();
    createdPostIds.push(post_id);

    await prisma.post.create({
      data: {
        post_id,
        title: p.title,
        slug: p.slug + `-${i + 1}`, // ensure uniqueness
        keywords: p.keywords || null,
        main_photo_url: p.main_photo_url,
        main_photo_alt: p.main_photo_alt,
        excerpt: p.excerpt,
        article_content: p.article_content,
        is_featured: p.is_featured,
        category_id: categorySlugToId[p.category_slug] || null,
        created_at: p.created_at,
        updated_at: p.updated_at,
        tags: {
          connect: p.tags.map((idx) => ({
            tag_id: tagIds[idx % tagIds.length],
          })),
        },
      },
    });

    // TableOfContentItems
    for (const toc of p.toc) {
      await prisma.tableOfContentItem.create({
        data: {
          toc_item_id: uuidv4(),
          post_id,
          item_html_id: toc.item_html_id,
          title: toc.title,
          display_order: toc.display_order,
        },
      });
    }

    // ArticleImages
    for (const img of p.article_images) {
      await prisma.articleImage.create({
        data: {
          article_image_id: uuidv4(),
          post_id,
          image_url: img.image_url,
          alt_text: img.alt_text,
          display_order: img.display_order,
        },
      });
    }
  }

  // RelatedPosts (after all posts are created, to get IDs)
  // Only for the first post as in your dummy
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    if (p.relatedPosts && p.relatedPosts.length && i === 0) {
      for (const relIdx of p.relatedPosts) {
        if (createdPostIds[relIdx]) {
          await prisma.relatedPost.create({
            data: {
              post_id_1: createdPostIds[0],
              post_id_2: createdPostIds[relIdx],
            },
          });
        }
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
