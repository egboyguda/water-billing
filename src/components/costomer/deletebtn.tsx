'use client'

import { deleteUserAction } from "@/actions/editUser";

interface DeleteBtnProps {
    userId: string;
}
export default function DeleteBtn({ userId }: DeleteBtnProps) {
    return (

        <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={async () => {
                await deleteUserAction(userId);
            }}
        >
            Delete
        </button>

    );
}