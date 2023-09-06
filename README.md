# go-go-pharma-dashboard

GoGo-Pharma - Admin Dashboard

# Useful links

-   https://postgrest.org/en/stable/index.html
-   https://supabase.com/docs/reference/javascript/select
-   https://firebase.google.com/docs/web/setup

# API examples

```sh
export API_URL="https://postgrest-py6h4z473a-ew.a.run.app"
export TOKEN="$(npm run --silent generate:dashboard-token alxarch)"
```

## /product_catgory

### Schema

```ts
type ProductCategory = {
    id: string; // foo.bar_baz.qux, up to 3 parts deep, must match /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/
    url_path: string; // generated form id by replacing '_' with '-' and '.' with '/',
    translations: {
        en: {
            title: string;
            description_html?: string;
        };
        ar?: {
            title: string;
            description_html?: string;
        };
    };
};
```

### Examples

Get up to 10 product categories

```sh
curl -H "Authorization: Bearer ${TOKEN}" "${API_URL}/product_category?limit=10"
```

<details>
    <summary>Response</summary>

```json
[
    {
        "id": "nutrition.herbals",
        "url_path": "nutrition/herbals",
        "translations": {
            "en": {
                "title": "Nutrition > Herbals",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-30T12:21:56.701114+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-30T12:21:56.701114+00:00"
    },
    {
        "id": "nutrition.general_health.bone_and_joint_support",
        "url_path": "nutrition/general-health/bone-and-joint-support",
        "translations": {
            "en": {
                "title": "Nutrition>General Health>Bone & Joint Support",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-25T10:37:44.049573+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-28T13:45:31.033438+00:00"
    },
    {
        "id": "nutrition.vitamins_and_minerals.vitamins",
        "url_path": "nutrition/vitamins-and-minerals/vitamins",
        "translations": {
            "en": {
                "title": "Nutrition>Vitamins & Minerals>Vitamins",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-25T10:37:44.61774+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-28T13:45:31.033438+00:00"
    },
    {
        "id": "medical_essentials.digestive_support.indigestion",
        "url_path": "medical-essentials/digestive-support/indigestion",
        "translations": {
            "en": {
                "title": "Medical Essentials>Digestive Support>Indigestion",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-25T10:37:44.264052+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-28T13:45:31.033438+00:00"
    },
    {
        "id": "nutrition.general_health.weight_management",
        "url_path": "nutrition/general-health/weight-management",
        "translations": {
            "en": {
                "title": "Nutrition>General Health>Weight Management",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-25T10:37:39.23266+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-28T13:45:31.033438+00:00"
    },
    {
        "id": "nutrition.general_health.hair_skin_and_nails",
        "url_path": "nutrition/general-health/hair-skin-and-nails",
        "translations": {
            "en": {
                "title": "Nutrition>General Health>Hair, Skin & Nails",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-25T10:37:44.049573+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-28T13:45:31.033438+00:00"
    },
    {
        "id": "medical_essentials.pain_and_fever.body_pain_relief",
        "url_path": "medical-essentials/pain-and-fever/body-pain-relief",
        "translations": {
            "en": {
                "title": "Medical Essentials>Pain & Fever>Body Pain Relief",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-25T10:37:44.920007+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-28T13:45:31.033438+00:00"
    },
    {
        "id": "nutrition.general_health.heart_health",
        "url_path": "nutrition/general-health/heart-health",
        "translations": {
            "en": {
                "title": "Nutrition>General Health>Heart Health",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-25T10:37:44.61774+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-28T13:45:31.033438+00:00"
    },
    {
        "id": "personal_care.women_s_care.pregnancy_and_fertility",
        "url_path": "personal-care/women-s-care/pregnancy-and-fertility",
        "translations": {
            "en": {
                "title": "Personal Care>Women's Care>Pregnancy & Fertility",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-25T10:37:44.049573+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-28T13:45:31.033438+00:00"
    },
    {
        "id": "nutrition.vitamins_and_minerals.multivitamins",
        "url_path": "nutrition/vitamins-and-minerals/multivitamins",
        "translations": {
            "en": {
                "title": "Nutrition>Vitamins & Minerals>Multivitamins",
                "created_at": "2023-08-25T10:37:32.89772+00:00",
                "updated_at": "2023-08-25T10:37:44.920007+00:00",
                "description_html": null
            }
        },
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-28T13:45:31.033438+00:00"
    }
]
```

</details>

## /product

### Schema

```ts
type Product = {
    id: number // Integer the autogenerated product id
    sku: string // product SKU (Stock Keeping Unit) human readable unique identifier for the product
    category_id: string // foo.bar_baz.qux the category.json it belongs to, must be depth 3.
    attributes?: Record<string, string> // Attributes of the object. Keys must be a name in the attribute table
    variant_group_id?: number  // Integer, the id of the variant group the product belongs to (if any)  FK variant_group(id)
    variant_group_attributes?: Record<string, string> // Autogenerated based on variant_group_id and attributes
    brand_id?: number // Integer, FK brand(id)
    brand_slug?: string // Slug of product's brand FK brand(slug)
    translations: {
        en: {
            title: string,
            description_html?: string
        },
        ar?: {
              title: string,
              description_html?: string
        }
    },
    product_images?: string[] // An array of product image urls (order implies priority)
}
```

### Examples:

Request up to 10 products of variant group 1

```sh
curl -H "Authorization: Bearer ${TOKEN}" "${API_URL}/product?limit=10&variant_group_id=eq.1"
```

<details>
<summary> Response </summary>

```json
[
  {
    "id": 1,
    "sku": "GO00001",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 1,
    "brand_slug": "ch-alpha",
    "category_id": "nutrition.general_health.bone_and_joint_support",
    "translations": {
      "ar": {
        "title": "قوارير سي اتش ألفا القابلة للشرب 25 مل 30 حبة",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>وصف المنتج</h2>عند شعورك بالألم مع كل خطوة تخطوها، تتأثر جودة الحياة بشكل كبير. تناولك لعقار سي اتش ألفا هو الطريقة المثالية والطبيعية والفعالة لحماية وتجديد الغضاريف المفصلية – لأسلوب حياة يتسم بالنشاط في جميع مراحل العمر. يساعد على استعادة الأشخاص جودة حياتهم التي تتسم بالنشاط. سي اتش ألفا هي تركيبة عالية الفعالية ومريحة للغاية ومذاقها لطيف تحتوي على الكولاجين السائل. ثبت علمياً أن ببتيدات الكولاجين الطبيعية النشطة حيويًا تحفز تخليق الغضاريف المفصلية الجديدة. في العديد من الحالات، يمكن أن يساعد الإمداد المنتظم بببتيدات الكولاجين في تجديد الغضاريف المفصلية وجعل الحركة أكثر سلاسة وراحة. بعد بضعة أسابيع فقط من تناول الطعام بانتظام، يعبر العديد من المرضى عن امتنانهم من تخفيف الألم بشكل كبير وزيادة الحركة.<h2>الفوائد</h2><ul>\n<li>المساعدة في تغذية الأنسجة الغضروفية مباشرة</li>\n<li>مساعدة الغضاريف على امتصاص أقصى قدر من العناصر الغذائية</li>\n<li>المساعدة في تجديد واستعادة تَنَكُّس الغضاريف </li>\n<li>تقليل آلام المفاصل وشفاء إصابات المفاصل وحماية صحة المفاصل ومرونتها</li>\n</ul><h2>كيفية الاستخدام</h2><ul>\n <li>قارورة واحدة مرة يوميًا</li>\n <li>أو وفقًا لما يوصي به مقدم الرعاية الصحية</li>\n <li>لا تتجاوز الجرعة اليومية الموصى بها</li>\n</ul>"
      },
      "en": {
        "title": "CH-Alpha 25 mL Vial 30's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Contains FORTIGEL – The Joint Health Revolution </li><li>Promotes cartilage and joint health </li><li>30 ready-to-drink vials of 25 ml / 0.85oz</li></ul><h2>Description</h2><ul> <li>CH-Alpha contains highly dosed FORTIGEL and stimulates the regeneration of joint cartilage. 70% of cartilage substance consists of collagen. Collagen makes the joints smooth and flexible. In liquid form it is well absorbed by the body. It is available in easy and convenient vials with great fruit flavor.</li> </ul><h2>Benefits</h2><ul><li>Helps nourish cartilage tissue directly</li><li>Help cartilage absorb maximum nutrients</li><li>Helps regenerate and restore cartilage degeneration</li><li>Reduce joint pain, joint injuries heal and protect joints health and flexibility</li></ul><h2>How to use</h2><ul><li>Drink one vial daily to promote joint health</li><li>Use at least for three months or as recommended by a healthcare practitioner</li><li>The recommended daily dose must not be exceeded</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1002020_1_hqnzc96cnv0gzpcd.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1002020_2.jpg.mst.png"
    ]
  },
  {
    "id": 2,
    "sku": "GO00004",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 2,
    "category_id": "nutrition.vitamins_and_minerals.vitamins",
    "translations": {
      "en": {
        "title": "Activise Calcium + Vitamin C Lemon Flavor Effervescent Tablet 13's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Calcium + Vitamin C 500mg/1000mg</li><li>Lemon Flavor</li><li>For strong bones</li><li>For strong immunity</li></ul><h2>Description</h2><ul> <li>Activise Calcium + Vitamin C Lemon Flavor Effervescent Tablet supports maintenance of normal bones, teeth and strengthens immune system by giving cell protection from oxidative stress.</li> </ul><h2>Benefits</h2><ul><li>Vitamin C helps to increase the efficiency of calcium absorption to strengthen teeth and bones</li><li>It helps to strengthen immune system to reduce the risk of chronic disease</li><li>It may help to reduce the risk of heart disease</li></ul><h2>How to use</h2><ul><li>For adults take one effervescent tablet daily</li><li>Dissolve in a glass of water and drink</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022686_1_mkinp3oadfxopnl8.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022686_1.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022686_4_1.jpg.mst.png"
    ]
  },
  {
    "id": 3,
    "sku": "GO00005",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 3,
    "category_id": "medical_essentials.digestive_support.indigestion",
    "translations": {
      "en": {
        "title": "Proflora Restore Adults Capsules 30's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>High concentration of 11 probiotics</li><li>Effective and targeted probiotic release</li><li>Formulated for supporting digestive health</li></ul><h2>Description</h2><ul> <li>Probiotics: The human digestive system contains billions of friendly bacteria, often referred to as probiotics. Probiotics play a vital role in maintaining a healthy balance and normal functioning of the digestive system. Many factors may disrupt the delicate balance of the digestive system and cause discomfort like antibiotics change of diet, travel and environmental change.</li> </ul><h2>Benefits</h2><ul><li>Formulated for supporting digestive health </li><li>Helps to restore the digestive balance </li><li>Does not require refrigeration</li></ul><h2>How to use</h2><ul><li>1-2 capsules to help maintain a healthy balance of the digestive system </li><li>2-3 capsules to help restore a healthy balance of the digestive system </li><li>The stated recommended dosage may not be exceeded, food supplement should not be used as a substitute for a varied diet </li><li>Children less than 1 year of age and pregnant or breast feeding women should not take this product except on the advice of a doctor</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1009385_1.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1009385_2.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1009385_5.jpg.mst.png"
    ]
  },
  {
    "id": 4,
    "sku": "GO00006",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 4,
    "category_id": "nutrition.general_health.weight_management",
    "translations": {
      "en": {
        "title": "Slim Tea Club 28 Day Tea Tox Programme 28's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Slimming tea</li><li>Boosts metabolism</li><li>Burns Fat</li><li>Full of antioxidant</li></ul><h2>Description</h2><ul> <li>Slim Tea Club 28 Day Tea Tox Programme helps the customers to achieve their health and weight loss goals without using unhealthy crash diets by offering natural proven products along with healthy diet, lifestyle and training tips. Slim Tea Club products are formulated using proven natural ingredients to aid weight loss and also have multiple benefits.</li> </ul><h2>Benefits</h2><ul><li>It helps to aid weight loss and detoxification</li><li>Helps to maintain healthy balanced lifestyle</li><li>Perfect to aid goodnight sleep</li></ul><h2>How to use</h2><ul><li>For morning boost slim tea: Heat fresh water to almost boiling, pour over one tea bag and leave for 3 minutes. Drink without milk. Drink every morning to give a boost and kickstart the day.</li><li>For evening cleanse slim tea: Boil fresh water, pour over one tea bag and leave for 3 minutes. Drink without milk. Drink every evening for the duration of the programme before bed for a natural cleanse and calming sleep.</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022684_1.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022684_2.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022684_3.jpg.mst.png"
    ]
  },
  {
    "id": 5,
    "sku": "GO00007",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 5,
    "category_id": "nutrition.general_health.hair_skin_and_nails",
    "translations": {
      "en": {
        "title": "NeoCell Super Collagen Powder 198 g",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>For radiant skin, thicker hair, stronger nails and healthier joint </li><li>Total body health </li><li>Dietary supplement</li></ul><h2>Description</h2><ul> <li>Super Collagen uses bioactive neocell collagen type 1 and 3. Collagen type 1 and 3 is 90 % of the body's collagen and is the main collagen constituents in the skin, hair, nails, ligaments, tendons, bones and muscles. Super collagen products provide a pure and potent dose of clinically tested, enzymatically hydrolyzed collagen. Specially formulated in an easy to take powder form and works synergistically with Vitamin C, recommended to be mixed with orange juice or a Vitamin C supplement.</li> </ul><h2>Benefits</h2><ul><li>Helps minimize fine lines and wrinkles</li><li>Clinically tested to increase skin hydration</li><li>Supports bone and connective tissue health</li><li>Strengthens hair and nails</li><li>Glycine contributes to lean muscle</li></ul><h2>How to use</h2><ul><li>As a dietary supplement, dissolve one scoop of super collagen with one spoon of water or orange juice</li><li>Then add 6-8 ounces or more of liquid and stir vigorously, for best results, use a blender</li><li>For optimum nutritional benefits, drink as suggested on an empty stomach and wait 30 minutes before eating</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1018508_1.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1018508_2.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1018508_3.jpg.mst.png"
    ]
  },
  {
    "id": 6,
    "sku": "GO06342",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 6,
    "category_id": "medical_essentials.pain_and_fever.body_pain_relief",
    "translations": {
      "en": {
        "title": "Anodesyn Double Action Ointment 25 g",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Information</h2>Anodesyn Double Action Ointment contains lidocaine which is a local painkiller to relieve pain and discomfort and allantoin which helps with the healing process. This medicine relieves the pain and irritation associated with external piles.<br><h2>Description</h2><ul class=\"clist\"><li>With lidocaine HCL and allantoin </li><li>Effective relief from haemorrhoids/piles </li><li>Local painkiller</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1020690_1.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1020690_2.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1020690_3.png"
    ]
  },
  {
    "id": 7,
    "sku": "GO00008",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 7,
    "category_id": "nutrition.general_health.heart_health",
    "translations": {
      "en": {
        "title": "Solaray Ubiquinol CoQ-10 100 mg Softgel 30's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Ubiquinol, the reduced form of CoQ10</li><li>Enhanced Absorption</li><li>Present in order for the body to produce energy</li></ul><h2>Description</h2><ul> <li>Solaray Ubiquinol CoQ-10 supplement may be better suited for people who have trouble converting Ubiquinone to Ubiquinol. CoQ10 is an antioxidant that supports healthy cardiovascular function. It also supports healthy aging because CoQ10 declines with age, pure CoQ10 may help restore levels in the body</li> </ul><h2>Benefits</h2><ul><li>May help support healthy heart function.</li><li>Improves energy levels</li><li>Improve physical performance and stamina</li></ul><h2>How to use</h2><ul><li>Take one softgel daily with a meal or glass of water</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1039535_1.jpg.mst.png"
    ]
  },
  {
    "id": 8,
    "sku": "GO00009",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 8,
    "category_id": "medical_essentials.digestive_support.indigestion",
    "translations": {
      "en": {
        "title": "Nature's Answer Licorice Root 2000 mg Fluid Extract Drops 30 mL",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul> <li>Herbal supplement </li> <li>Fluid extract </li> <li>2000 mg serving</li> </ul><h2>Description</h2><ul> <li>Nature's Answer Licorice Root Fluid Extract Drops contains licorice, a perennial herbaceous plant that is native to many regions of the world, including southern Russia, the Mediterranean, parts of Asia, and southern regions of Europe. Licorice root extract is often used to relieve symptoms of indigestion, such as acid reflux, upset stomach, and heartburn. It is also said to have a soothing effect on skin and helps to ease inflammation The alcohol free extracts are produced using cold Bio-Chelated proprietary extraction process, yielding a Holistically Balanced Advanced Botanical Fingerprint extract in the same synergistic ratio as in the plant.</li> </ul><h2>Benefits</h2><ul> <li>Supports digestive health </li> <li>Supports healthy skin </li> <li>Addresses low energy levels</li> </ul><h2>How to use</h2><ul> <li>Take 1-2 ml (67 drops) three times a day in a small amount of water.</li> </ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1047282_1.jpg.mst.png"
    ]
  },
  {
    "id": 9,
    "sku": "GO00010",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 9,
    "category_id": "personal_care.women_s_care.pregnancy_and_fertility",
    "translations": {
      "en": {
        "title": "Country Life Realfood Organics Prenatal Daily Nutrition Tablets 90's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>800 mcg of whole food folic acid </li><li>18 mg of whole food iron </li><li>Gentle on the stomach </li><li>Now with kelp</li></ul><h2>Description</h2><ul> <li>Realfood Organics Prenatal Daily Nutrition is the first certified organic Prenatal primarily made from real fruits and vegetables. This formula includes valuable vitamins and minerals per serving needed in a prenatal diet. It is made from 40 USDA organic fruits, vegetables, greens, sprouts, legumes and other organic foods. It is the only USDA certified organic multivitamin line made from fermented whole foods with 2-4 servings of fruits and vegetables, in just 3 easy-to-swallow tablets.</li> </ul><h2>Benefits</h2><ul><li>Energy metabolism through rich B-Vitamin profile </li><li>Immune health with the inclusion of Vitamin C, D and E </li><li>Healthier hair, skin, and nails </li><li>100% inner fillet organic aloe vera</li></ul><h2>How to use</h2><ul><li>Adults take three (3) tablets daily </li><li>Do not exceed recommended dose </li><li>No need to take with food - it is food </li><li>As a reminder, discuss the supplements and medications that you take with your health care providers</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1019718_1.jpg.mst.png"
    ]
  },
  {
    "id": 10,
    "sku": "GO00011",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 9,
    "category_id": "nutrition.vitamins_and_minerals.multivitamins",
    "translations": {
      "en": {
        "title": "Country Life Realfood Organics Women's Daily Nutrition Tablets 60's 9104",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Whole food multivitamin </li><li>From whole raw fruits and vegetables </li><li>8 Whole food vitamin and minerals</li></ul><h2>Description</h2><ul> <li>Realfood Organics Daily Nutrition is made from 40 USDA organic fruits, vegetables, grains, sprouts, and legumes and other organic foods. It offers more than just a vitamin and mineral complex. It also includes nutrients to support your everyday health. In just 1 easy-to-swallow tablet, you get the ORAC equivalent of 2 servings of fruits and vegetables.</li> </ul><h2>Benefits</h2><ul><li>Energy metabolism through our rich B-vitamin profile </li><li>Immune health with the inclusion of vitamin C, D and E </li><li>Healthier hair, skin, and nails </li><li>100% inner fillet organic aloe vera </li><li>Combines fresh, raw whole food ingredients with probiotic cultures which are fermented and freeze-dried</li></ul><h2>How to use</h2><ul><li>Adults take two (2) tablets daily </li><li>No need to take with food - it is food </li><li>As a reminder, discuss the supplements and medications that you take with your health care providers</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022028_1_lcdeaaiyzesvjvrw.jpg.mst.png"
    ]
  }
]
```

</details>

First 10 products of any category under nutrition.\*

```sh
curl -H "Authorization: Bearer ${TOKEN}" "${API_URL}/product?limit=10&category_id=cd.nutrition"
```
<details><summary>Response</summary>

```json
[
  {
    "id": 1,
    "sku": "GO00001",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 1,
    "category_id": "nutrition.general_health.bone_and_joint_support",
    "translations": {
      "ar": {
        "title": "قوارير سي اتش ألفا القابلة للشرب 25 مل 30 حبة",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>وصف المنتج</h2>عند شعورك بالألم مع كل خطوة تخطوها، تتأثر جودة الحياة بشكل كبير. تناولك لعقار سي اتش ألفا هو الطريقة المثالية والطبيعية والفعالة لحماية وتجديد الغضاريف المفصلية – لأسلوب حياة يتسم بالنشاط في جميع مراحل العمر. يساعد على استعادة الأشخاص جودة حياتهم التي تتسم بالنشاط. سي اتش ألفا هي تركيبة عالية الفعالية ومريحة للغاية ومذاقها لطيف تحتوي على الكولاجين السائل. ثبت علمياً أن ببتيدات الكولاجين الطبيعية النشطة حيويًا تحفز تخليق الغضاريف المفصلية الجديدة. في العديد من الحالات، يمكن أن يساعد الإمداد المنتظم بببتيدات الكولاجين في تجديد الغضاريف المفصلية وجعل الحركة أكثر سلاسة وراحة. بعد بضعة أسابيع فقط من تناول الطعام بانتظام، يعبر العديد من المرضى عن امتنانهم من تخفيف الألم بشكل كبير وزيادة الحركة.<h2>الفوائد</h2><ul>\n<li>المساعدة في تغذية الأنسجة الغضروفية مباشرة</li>\n<li>مساعدة الغضاريف على امتصاص أقصى قدر من العناصر الغذائية</li>\n<li>المساعدة في تجديد واستعادة تَنَكُّس الغضاريف </li>\n<li>تقليل آلام المفاصل وشفاء إصابات المفاصل وحماية صحة المفاصل ومرونتها</li>\n</ul><h2>كيفية الاستخدام</h2><ul>\n <li>قارورة واحدة مرة يوميًا</li>\n <li>أو وفقًا لما يوصي به مقدم الرعاية الصحية</li>\n <li>لا تتجاوز الجرعة اليومية الموصى بها</li>\n</ul>"
      },
      "en": {
        "title": "CH-Alpha 25 mL Vial 30's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Contains FORTIGEL – The Joint Health Revolution </li><li>Promotes cartilage and joint health </li><li>30 ready-to-drink vials of 25 ml / 0.85oz</li></ul><h2>Description</h2><ul> <li>CH-Alpha contains highly dosed FORTIGEL and stimulates the regeneration of joint cartilage. 70% of cartilage substance consists of collagen. Collagen makes the joints smooth and flexible. In liquid form it is well absorbed by the body. It is available in easy and convenient vials with great fruit flavor.</li> </ul><h2>Benefits</h2><ul><li>Helps nourish cartilage tissue directly</li><li>Help cartilage absorb maximum nutrients</li><li>Helps regenerate and restore cartilage degeneration</li><li>Reduce joint pain, joint injuries heal and protect joints health and flexibility</li></ul><h2>How to use</h2><ul><li>Drink one vial daily to promote joint health</li><li>Use at least for three months or as recommended by a healthcare practitioner</li><li>The recommended daily dose must not be exceeded</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1002020_1_hqnzc96cnv0gzpcd.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1002020_2.jpg.mst.png"
    ]
  },
  {
    "id": 2,
    "sku": "GO00004",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 2,
    "category_id": "nutrition.vitamins_and_minerals.vitamins",
    "translations": {
      "en": {
        "title": "Activise Calcium + Vitamin C Lemon Flavor Effervescent Tablet 13's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Calcium + Vitamin C 500mg/1000mg</li><li>Lemon Flavor</li><li>For strong bones</li><li>For strong immunity</li></ul><h2>Description</h2><ul> <li>Activise Calcium + Vitamin C Lemon Flavor Effervescent Tablet supports maintenance of normal bones, teeth and strengthens immune system by giving cell protection from oxidative stress.</li> </ul><h2>Benefits</h2><ul><li>Vitamin C helps to increase the efficiency of calcium absorption to strengthen teeth and bones</li><li>It helps to strengthen immune system to reduce the risk of chronic disease</li><li>It may help to reduce the risk of heart disease</li></ul><h2>How to use</h2><ul><li>For adults take one effervescent tablet daily</li><li>Dissolve in a glass of water and drink</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022686_1_mkinp3oadfxopnl8.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022686_1.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022686_4_1.jpg.mst.png"
    ]
  },
  {
    "id": 4,
    "sku": "GO00006",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 4,
    "category_id": "nutrition.general_health.weight_management",
    "translations": {
      "en": {
        "title": "Slim Tea Club 28 Day Tea Tox Programme 28's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Slimming tea</li><li>Boosts metabolism</li><li>Burns Fat</li><li>Full of antioxidant</li></ul><h2>Description</h2><ul> <li>Slim Tea Club 28 Day Tea Tox Programme helps the customers to achieve their health and weight loss goals without using unhealthy crash diets by offering natural proven products along with healthy diet, lifestyle and training tips. Slim Tea Club products are formulated using proven natural ingredients to aid weight loss and also have multiple benefits.</li> </ul><h2>Benefits</h2><ul><li>It helps to aid weight loss and detoxification</li><li>Helps to maintain healthy balanced lifestyle</li><li>Perfect to aid goodnight sleep</li></ul><h2>How to use</h2><ul><li>For morning boost slim tea: Heat fresh water to almost boiling, pour over one tea bag and leave for 3 minutes. Drink without milk. Drink every morning to give a boost and kickstart the day.</li><li>For evening cleanse slim tea: Boil fresh water, pour over one tea bag and leave for 3 minutes. Drink without milk. Drink every evening for the duration of the programme before bed for a natural cleanse and calming sleep.</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022684_1.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022684_2.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022684_3.jpg.mst.png"
    ]
  },
  {
    "id": 5,
    "sku": "GO00007",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 5,
    "category_id": "nutrition.general_health.hair_skin_and_nails",
    "translations": {
      "en": {
        "title": "NeoCell Super Collagen Powder 198 g",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>For radiant skin, thicker hair, stronger nails and healthier joint </li><li>Total body health </li><li>Dietary supplement</li></ul><h2>Description</h2><ul> <li>Super Collagen uses bioactive neocell collagen type 1 and 3. Collagen type 1 and 3 is 90 % of the body's collagen and is the main collagen constituents in the skin, hair, nails, ligaments, tendons, bones and muscles. Super collagen products provide a pure and potent dose of clinically tested, enzymatically hydrolyzed collagen. Specially formulated in an easy to take powder form and works synergistically with Vitamin C, recommended to be mixed with orange juice or a Vitamin C supplement.</li> </ul><h2>Benefits</h2><ul><li>Helps minimize fine lines and wrinkles</li><li>Clinically tested to increase skin hydration</li><li>Supports bone and connective tissue health</li><li>Strengthens hair and nails</li><li>Glycine contributes to lean muscle</li></ul><h2>How to use</h2><ul><li>As a dietary supplement, dissolve one scoop of super collagen with one spoon of water or orange juice</li><li>Then add 6-8 ounces or more of liquid and stir vigorously, for best results, use a blender</li><li>For optimum nutritional benefits, drink as suggested on an empty stomach and wait 30 minutes before eating</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1018508_1.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1018508_2.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1018508_3.jpg.mst.png"
    ]
  },
  {
    "id": 7,
    "sku": "GO00008",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 7,
    "category_id": "nutrition.general_health.heart_health",
    "translations": {
      "en": {
        "title": "Solaray Ubiquinol CoQ-10 100 mg Softgel 30's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Ubiquinol, the reduced form of CoQ10</li><li>Enhanced Absorption</li><li>Present in order for the body to produce energy</li></ul><h2>Description</h2><ul> <li>Solaray Ubiquinol CoQ-10 supplement may be better suited for people who have trouble converting Ubiquinone to Ubiquinol. CoQ10 is an antioxidant that supports healthy cardiovascular function. It also supports healthy aging because CoQ10 declines with age, pure CoQ10 may help restore levels in the body</li> </ul><h2>Benefits</h2><ul><li>May help support healthy heart function.</li><li>Improves energy levels</li><li>Improve physical performance and stamina</li></ul><h2>How to use</h2><ul><li>Take one softgel daily with a meal or glass of water</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1039535_1.jpg.mst.png"
    ]
  },
  {
    "id": 10,
    "sku": "GO00011",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 9,
    "category_id": "nutrition.vitamins_and_minerals.multivitamins",
    "translations": {
      "en": {
        "title": "Country Life Realfood Organics Women's Daily Nutrition Tablets 60's 9104",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Whole food multivitamin </li><li>From whole raw fruits and vegetables </li><li>8 Whole food vitamin and minerals</li></ul><h2>Description</h2><ul> <li>Realfood Organics Daily Nutrition is made from 40 USDA organic fruits, vegetables, grains, sprouts, and legumes and other organic foods. It offers more than just a vitamin and mineral complex. It also includes nutrients to support your everyday health. In just 1 easy-to-swallow tablet, you get the ORAC equivalent of 2 servings of fruits and vegetables.</li> </ul><h2>Benefits</h2><ul><li>Energy metabolism through our rich B-vitamin profile </li><li>Immune health with the inclusion of vitamin C, D and E </li><li>Healthier hair, skin, and nails </li><li>100% inner fillet organic aloe vera </li><li>Combines fresh, raw whole food ingredients with probiotic cultures which are fermented and freeze-dried</li></ul><h2>How to use</h2><ul><li>Adults take two (2) tablets daily </li><li>No need to take with food - it is food </li><li>As a reminder, discuss the supplements and medications that you take with your health care providers</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1022028_1_lcdeaaiyzesvjvrw.jpg.mst.png"
    ]
  },
  {
    "id": 11,
    "sku": "GO00012",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 9,
    "category_id": "nutrition.general_health.hair_skin_and_nails",
    "translations": {
      "en": {
        "title": "Country Life Maxi-Hair Plus Capsules 120's 5045",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Healthier hair and skin </li><li>Supports strong nails </li><li>5000 mcg biotin</li></ul><h2>Description</h2><ul> <li>Maxi-Hair Plus is the newest complement to the long-standing original favorite, Maxi-Hair. It is formulated with B vitamins, biotin and MSM, and brings life back to your hair, skin and nails. Maxi-Hair Plus (in vegetarian capsules) contains 5 mg (5,000 mcg) of biotin.</li> </ul><h2>Benefits</h2><ul><li>Healthier hair and skin </li><li>Supports strong nails </li><li>Maximized formula</li></ul><h2>How to use</h2><ul><li>Adults, take four (4) capsules daily </li><li>For best utilization, take with food </li><li>As a reminder, discuss the supplements and medications that you take with your health care providers</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1002048_4_4xhnwfcmto2i29vf.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1002048_1.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1002048_3.jpg.mst.png"
    ]
  },
  {
    "id": 13,
    "sku": "GO00015",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 13,
    "category_id": "nutrition.kids_health.other_kids_supplements",
    "translations": {
      "en": {
        "title": "Nordic Naturals Children's DHA Omega 3 530 mg Syrup 119 mL",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Children DHA with 530 mg of EPA and DHA</li><li>Omega 3 DHA from 100% wild arctic cod</li><li>For healthy brain development and immune system functions</li></ul><h2>Description</h2><ul> <li>Nordic Naturals Children's DHA Omega 3 is made exclusively from our pure Arctic Cod Liver Oil, Children�s DHA is a naturally balanced source of the omega-3s EPA and DHA that growing kids need for healthy development. It supports brain development, cognition, and learning in an easy-to-chew soft gel, or a tasty liquid in children aged 1-6 years.</li> </ul><h2>Benefits</h2><ul><li>Supports learning and cognitive development</li><li>Great tasting liquid</li><li>Non-GMO and third party tested formula</li></ul><h2>How to use</h2><ul><li>Recommended for children ages 1-6):&nbsp;One-half teaspoon daily, with food, or as directed by your healthcare professional or pharmacist. For best results, please refrigerate and use within three months after opening.</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1040144_1.jpg.mst.png"
    ]
  },
  {
    "id": 14,
    "sku": "GO00017",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 8,
    "category_id": "nutrition.general_health.hair_skin_and_nails",
    "translations": {
      "en": {
        "title": "Nature's Answer DermaBrite with Glutathione Vegetarian Capsules 60's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>1000 mg of L-Glutathione </li><li> Skin brightening formula </li><li>Balances complexion </li><li>Antioxidant support </li><li>Holistically balanced</li></ul><h2>Description</h2><ul> <li>Natures Answer DermaBrite W/ Glutathione V-Cap 60's contains 1000 mg of L-Glutathione that provides antioxidant and skin whitening effect to the body. It helps to detoxify liver for proper metabolism.</li> </ul><h2>Benefits</h2><ul><li>It has antioxidant properties which helps the liver for detoxification </li><li>Vegan </li><li>With skin brightening formula that helps the skin to have a balance complexion</li></ul><h2>How to use</h2><ul><li>As a dietary supplement take two capsules once daily, preferably with water.</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1023402_1.jpg.mst.png",
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1023402_2.jpg.mst.png"
    ]
  },
  {
    "id": 15,
    "sku": "GO00018",
    "variant_group_id": null,
    "variant_group_attributes": null,
    "brand_id": 15,
    "category_id": "nutrition.vitamins_and_minerals.vitamins",
    "translations": {
      "en": {
        "title": "Now Natural E-400 Softgels 100's",
        "keywords": null,
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": "<h2>Overview</h2><ul><li>Antioxidant protection </li><li>D-alpha with Mixed Tocopherols </li><li>With 100 mcg of Selenium</li></ul><h2>Description</h2><ul> <li>Vitamin E is a major antioxidant and the body's primary defense against lipid peroxidation. Selenium is an essential trace mineral that has been included as a complement to Vitamin E.</li> </ul><h2>Benefits</h2><ul><li>Antioxidant protection </li><li>Natural Vitamin E with mixed tocopherols</li></ul><h2>How to use</h2><ul><li>As a dietary supplement, take 1 softgel daily preferably with a meal.</li></ul>"
      }
    },
    "attributes": null,
    "product_images": [
      "https://gogo-pharma.s3.ap-south-1.amazonaws.com/images/1007962_1new.jpg.mst.png"
    ]
  }
]

```

</details>

## /attribute

### Schema

```ts
type Attribute = {
    id: number,
    name: string // unique must match ^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$
    translations: {
        en: { title: string }
        ar?: { title: string }
    }
}
```

```sh
curl -H "Authorization: Bearer ${TOKEN}" "${API_URL}/attribute?limit=10"
```

<details><summary>Response</summary>

```json
[
  {
    "id": 1,
    "name": "count",
    "translations": {
      "en": {
        "title": "count",
        "created_at": "2023-08-25T10:37:33.041267+00:00",
        "updated_at": "2023-08-25T10:37:33.041267+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:33.041267+00:00",
    "updated_at": "2023-08-25T10:37:33.041267+00:00"
  },
  {
    "id": 2,
    "name": "flavor",
    "translations": {
      "en": {
        "title": "flavor",
        "created_at": "2023-08-25T10:37:33.041267+00:00",
        "updated_at": "2023-08-25T10:37:33.041267+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:33.041267+00:00",
    "updated_at": "2023-08-25T10:37:33.041267+00:00"
  },
  {
    "id": 3,
    "name": "potency",
    "translations": {
      "en": {
        "title": "potency",
        "created_at": "2023-08-25T10:37:33.117398+00:00",
        "updated_at": "2023-08-25T10:37:33.117398+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:33.117398+00:00",
    "updated_at": "2023-08-25T10:37:33.117398+00:00"
  },
  {
    "id": 6,
    "name": "stage",
    "translations": {
      "en": {
        "title": "stage",
        "created_at": "2023-08-25T10:37:33.283357+00:00",
        "updated_at": "2023-08-25T10:37:33.283357+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:33.283357+00:00",
    "updated_at": "2023-08-25T10:37:33.283357+00:00"
  },
  {
    "id": 7,
    "name": "weight",
    "translations": {
      "en": {
        "title": "weight",
        "created_at": "2023-08-25T10:37:33.283357+00:00",
        "updated_at": "2023-08-25T10:37:33.283357+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:33.283357+00:00",
    "updated_at": "2023-08-25T10:37:33.283357+00:00"
  },
  {
    "id": 8,
    "name": "size",
    "translations": {
      "en": {
        "title": "size",
        "created_at": "2023-08-25T10:37:33.360364+00:00",
        "updated_at": "2023-08-25T10:37:33.360364+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:33.360364+00:00",
    "updated_at": "2023-08-25T10:37:33.360364+00:00"
  },
  {
    "id": 10,
    "name": "type",
    "translations": {
      "en": {
        "title": "type",
        "created_at": "2023-08-25T10:37:34.980439+00:00",
        "updated_at": "2023-08-25T10:37:34.980439+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:34.980439+00:00",
    "updated_at": "2023-08-25T10:37:34.980439+00:00"
  },
  {
    "id": 11,
    "name": "color",
    "translations": {
      "en": {
        "title": "color",
        "created_at": "2023-08-25T10:37:34.980439+00:00",
        "updated_at": "2023-08-25T10:37:34.980439+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:34.980439+00:00",
    "updated_at": "2023-08-25T10:37:34.980439+00:00"
  },
  {
    "id": 14,
    "name": "volume",
    "translations": {
      "en": {
        "title": "volume",
        "created_at": "2023-08-25T10:37:35.414111+00:00",
        "updated_at": "2023-08-25T10:37:35.414111+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:35.414111+00:00",
    "updated_at": "2023-08-25T10:37:35.414111+00:00"
  },
  {
    "id": 15,
    "name": "model",
    "translations": {
      "en": {
        "title": "model",
        "created_at": "2023-08-25T10:37:38.553033+00:00",
        "updated_at": "2023-08-25T10:37:38.553033+00:00"
      }
    },
    "created_at": "2023-08-25T10:37:38.553033+00:00",
    "updated_at": "2023-08-25T10:37:38.553033+00:00"
  }
]
```
</details>


## /brand


### Schema

```ts
type Brand = {
    id: number,
    slug: string, // Unique, must match /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/
    logo_url?: string // url for an image of the brand
    translations: {
        en: { title: string, description_html?: string }
        ar?: { title: string, description_html?: string }
    }
}
```

### Examples

Retrieve 10 brands
```sh
curl -H "Authorization: Bearer ${TOKEN}" "${API_URL}/brand?limit=10"
```

<details><summary>Response</summary>


```json
[
  {
    "id": 1,
    "slug": "ch-alpha",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "Ch-Alpha",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  },
  {
    "id": 2,
    "slug": "activise",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "Activise",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  },
  {
    "id": 3,
    "slug": "proflora",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "Proflora",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  },
  {
    "id": 4,
    "slug": "slim-tea-club",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "Slim Tea Club",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  },
  {
    "id": 5,
    "slug": "neocell",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "NeoCell",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  },
  {
    "id": 6,
    "slug": "anodesyn",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "Anodesyn",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  },
  {
    "id": 7,
    "slug": "solaray",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "Solaray",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  },
  {
    "id": 8,
    "slug": "nature-s-answer",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "Nature's Answer",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  },
  {
    "id": 9,
    "slug": "country-life",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "Country Life",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  },
  {
    "id": 13,
    "slug": "nordic-naturals",
    "logo_url": null,
    "translations": {
      "en": {
        "title": "Nordic Naturals",
        "created_at": "2023-08-25T10:37:32.89772+00:00",
        "updated_at": "2023-08-25T10:37:32.89772+00:00",
        "description_html": null
      }
    },
    "created_at": "2023-08-25T10:37:32.89772+00:00",
    "updated_at": "2023-08-25T10:37:32.89772+00:00"
  }
]
```

</details>
