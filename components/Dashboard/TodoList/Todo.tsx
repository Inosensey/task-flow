"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Actions
import { updateTodoStatus, deleteTodo } from "@/actions/todolistActions";

// store
import { useNotificationStore } from "@/store/useNotificationStore";

// Components
import TodoListForm from "./TodoListForm";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Types
import { todoListDetails } from "@/Types/todoListTypes";
interface props {
  details: todoListDetails;
}
type todoListStatusMutationType = {
  todoListId: number;
  statusId: number;
};

export default function Todo({ details }: props) {
  // Initial use query
  const queryClient = useQueryClient();

  // Zustand Store
  const { setMessage, setShowSlideNotification } = useNotificationStore();

  // States
  const [formAction, setFormAction] = useState<string>("Add");
  const [showTodoListForm, setShowTodoListForm] = useState<boolean>(false);
  const [selectedTodoList, setSelectedTodoList] = useState<
    todoListDetails | undefined
  >(undefined);

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      todoListId = 0,
      statusId = 0,
    }: todoListStatusMutationType) => {
      return updateTodoStatus(todoListId, statusId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todolists"] });
      onTodoListActionSuccess(`TodoList: ${data.Response[0].title}, Updated`);
    },
    onError: (data) => {
      console.log(data);
    },
  });
  const { mutate: deleteMutate, isPending: deleting } = useMutation({
    mutationFn: (todoListId: number) => {
      return deleteTodo(todoListId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todolists"] });
      onTodoListActionSuccess(`TodoList: ${data.Response[0].title}, Deleted`);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const onTodoListActionSuccess = (message: string) => {
    const notifMessage = message;
    setMessage(notifMessage);
    setShowSlideNotification();
    hideNotificationTimer();
  };

  const hideNotificationTimer = () => {
    const interval = setTimeout(setShowSlideNotification, 5000);
    return () => clearTimeout(interval);
  };
  return (
    <>
      <div
        // style={{ borderLeft: `2px solid ${details.PriorityLevel.color}` }}
        className={`border-l-2 border-l-LightPrimaryDisabled flex justify-between items-center p-2`}
        key={details.id}
      >
        <div
          onClick={() => {
            setSelectedTodoList(details);
            // setFormAction("Edit");
            // setShowTodoListForm((prev) => !prev);
          }}
          className="max-h-[3.3rem] w-10/12 line-clamp-2"
        >
          <div className="flex gap-1">
            
          <Link href={`/dashboard/todolist/${details.id}`}>
            <p className="phone:text-sm underline cursor-pointer">
              {details.title}
            </p>
            </Link>
            <p className="phone:text-sm text-LightPrimary">
              {details.Frequencies.frequency}
            </p>
            <p
              style={{
                color: details.TodoListStatus.id === 1 ? "#007FFF" : "#008000",
              }}
              className="phone:text-sm"
            >
              {details.TodoListStatus.status}
            </p>
          </div>
          <p className="phone:text-xs">{details.description}</p>
        </div>
        <div className="flex justify-center gap-4 flex-1">
          {details.TodoListStatus.id !== 2 && (
            <span
              onClick={() => {
                const mutateParams: todoListStatusMutationType = {
                  todoListId: details.id,
                  statusId: 2,
                };
                mutate(mutateParams);
              }}
              className={`cursor-pointer w-4 ${
                isPending && "pointer-events-none"
              }`}
            >
              <FontAwesomeIcon
                className="phone:text-xl text-Success"
                icon={isPending ? faSpinner : faCircleCheck}
                spin={isPending ? true : false}
              />
            </span>
          )}
          <span
            onClick={() => {
              deleteMutate(details.id);
            }}
            className={`cursor-pointer w-4 ${
              deleting && "pointer-events-none"
            }`}
          >
            <FontAwesomeIcon
              className="phone:text-xl text-Error"
              icon={deleting ? faSpinner : faTrashCan}
              spin={deleting ? true : false}
            />
          </span>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showTodoListForm && (
          <TodoListForm
            setShowTodoListForm={setShowTodoListForm}
            action={formAction}
            data={selectedTodoList}
          />
        )}
      </AnimatePresence>
    </>
  );
}
