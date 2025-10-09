import Input from "./Input.jsx";

export default function NewProject() {
  return (
    <div className="w-[35rem] mt-16">
      <menu>
        <li>
          <button>Cancel</button>
        </li>
        <li>
          <button>Save</button>
        </li>
      </menu>
      <div>
        <Input label="Title" />
        <Input label="Discription" textarea/>
        <Input label="Due Date" />
      </div>
    </div>
  );
}
