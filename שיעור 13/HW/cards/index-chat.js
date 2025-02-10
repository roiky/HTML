// בודק אם הנתונים מ- data.js קיימים
if (typeof products !== "undefined") {
    // בוחר את ה-container שאליו נכניס את הכרטיסים
    const container = document.querySelector(".container");

    // יוצרים div נוסף שיאגד את כל הכרטיסים בעיצוב שורות
    const row = document.createElement("div");
    row.classList.add("row");

    // לולאת for שעוברת על כל המוצרים
    for (let i = 0; i < products.length; i++) {
        // שמירת המוצר הנוכחי מתוך המערך
        let product = products[i];

        // יצירת עמודת Bootstrap בגודל 4
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-4");

        // יצירת כרטיס Bootstrap
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "100%";

        // הוספת תמונת המוצר
        const img = document.createElement("img");
        img.src = product.image;
        img.classList.add("card-img-top");
        img.alt = product.title;

        // יצירת גוף הכרטיס
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // יצירת כותרת (שם המוצר)
        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = product.title;

        // יצירת מזהה המוצר
        const idText = document.createElement("p");
        idText.classList.add("card-text");
        idText.textContent = `ID: ${product.id}`;

        // יצירת תיאור המוצר
        const description = document.createElement("p");
        description.classList.add("card-text");
        description.textContent = `Description: ${product.description}`;

        // יצירת מחיר המוצר
        const price = document.createElement("p");
        price.classList.add("card-text");
        price.textContent = `Price: $${product.price}`;

        // יצירת כפתור קנייה
        const buyButton = document.createElement("a");
        buyButton.href = "#";
        buyButton.classList.add("btn", "btn-primary");
        buyButton.textContent = "Buy";

        // הוספת האלמנטים לגוף הכרטיס
        cardBody.appendChild(title);
        cardBody.appendChild(idText);
        cardBody.appendChild(description);
        cardBody.appendChild(price);
        cardBody.appendChild(buyButton);

        // הוספת התמונה והגוף לכרטיס
        card.appendChild(img);
        card.appendChild(cardBody);

        // הוספת הכרטיס לעמודה
        col.appendChild(card);

        // הוספת העמודה לשורה
        row.appendChild(col);
    }

    // הוספת השורה ל-container הראשי
    container.appendChild(row);
} else {
    console.error("Data not loaded properly. Ensure data.js is included.");
}
