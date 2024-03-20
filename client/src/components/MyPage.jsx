import { Button } from "flowbite-react";

export default function MyPage() {
    return (
        <div>
            <Button onClick={() => alert(1)}>Click me</Button>
        </div>
    );
}
