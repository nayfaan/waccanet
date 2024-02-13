import ErrorState from "../components/ErrorState";

export default function Developing() {
  return (
    <ErrorState
      errorNumber={404}
      title="Page Not Found"
      message_ja="このページは現在開発中です。"
      message_en="Sorry, we are developing this page now."
      buttonLabel="戻る"
      actionType="back"
    />
  );
}
