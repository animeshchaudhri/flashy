const BASE_URL = "http://localhost:3000";
// Card Services
async function getAllCards() {
  const response = await fetch(`${BASE_URL}/cards`);
  if (!response.ok) {
    throw new Error("Failed to fetch cards");
  }
  return response.json();
}

async function getCardById(id: number) {
  const response = await fetch(`${BASE_URL}/cards/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch card");
  }
  return response.json();
}

async function addCard(cardData: any) {
  const response = await fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });
  if (!response.ok) {
    throw new Error("Failed to add card");
  }
  return response.json();
}

async function updateCard(id: number, cardData: any) {
  const response = await fetch(`${BASE_URL}/cards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });
  if (!response.ok) {
    throw new Error("Failed to update card");
  }
  return response.json();
}

async function deleteCard(id: number) {
  const response = await fetch(`${BASE_URL}/cards/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete card");
  }
  return response.json();
}

async function getCardsByCategory(categoryId: number) {
  const response = await fetch(`${BASE_URL}/cards/category/${categoryId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch cards by category");
  }
  return response.json();
}
const CardService = {
  getAllCards,
  getCardById,
  addCard,
  updateCard,
  deleteCard,
  getCardsByCategory,
};
export default CardService;
