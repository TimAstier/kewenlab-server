// TODO: Use JSONApi serializer and schemas

export default function UserSerializer(user) {
  if (user) {
    const jsonString = JSON.stringify(user);
    const jsonObject = JSON.parse(jsonString);
    const serializedUser = {
      username: jsonObject.username,
      email: jsonObject.email
    };
    return serializedUser;
  }
  return {};
}
