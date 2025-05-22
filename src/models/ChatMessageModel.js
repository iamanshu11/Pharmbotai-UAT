export class ChatMessage {
    constructor({ id, user_query, ai_response, created_at, user, pharmacy }) {
        this.id = id;
        this.userQuery = user_query;
        this.aiResponse = ai_response;
        this.createdAt = new Date(created_at);
        this.user = {
            id: user.id,
            username: user.username,
            role: user.role,
        };
        this.pharmacy = {
            id: pharmacy.id,
            name: pharmacy.name,
        };
    }
}
