export default function NewlineText({text}) {
    const newText = text.split('\n').map((str,index) => <p key={index}>{str}</p>);
    return newText;
  }