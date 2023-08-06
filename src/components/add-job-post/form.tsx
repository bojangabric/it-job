import { EmploymentType, Experience, Position } from '@prisma/client';
import { transformExperienceToValue } from 'utils/transform-experience-to-value';
import { transformPositionToValue } from 'utils/transform-position-to-value';
import { transformTypeToValue } from 'utils/transform-type-to-value';
import { ListBox } from './list-box';
import { FieldLayout } from './field-layout';
import { Toggle } from 'components/toggle';
import { ListBoxArray } from './list-box-array';
import { forwardRef, useState } from 'react';
import { api } from 'utils/api';
import { useSession } from 'next-auth/react';

interface FormProps {
  closeModal: () => void;
}

interface FieldTypes {
  active: boolean;
  title: string;
  position: Position;
  experience: Experience;
  type: EmploymentType;
  skills: string[];
  description: string;
}

const Form = forwardRef<HTMLFormElement, FormProps>(({ closeModal }, ref) => {
  const [values, setValues] = useState<FieldTypes>({
    active: true,
    title: '',
    position: Position.FULL_STACK_DEVELOPER,
    experience: Experience.JUNIOR,
    type: EmploymentType.FULL_TIME,
    skills: [],
    description: ''
  });
  const { update } = useSession();

  const { mutate: createJobPost } = api.company.createJobPost.useMutation({
    onSuccess: update
  });

  return (
    <form
      ref={ref}
      onSubmit={e => {
        e.preventDefault();
        createJobPost(values);
        closeModal();
      }}
      className="my-8 inline-block w-full max-w-6xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Job post
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="items-center px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Active</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <Toggle
                enabled={values.active}
                onChange={() =>
                  setValues({ ...values, active: !values.active })
                }
              />
            </dd>
          </div>
          <div className="items-center px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 p-3"
                required
                value={values.title}
                onChange={e => setValues({ ...values, title: e.target.value })}
              />
            </dd>
          </div>

          <FieldLayout fieldName="Position">
            <ListBox
              options={Object.values(Position).map(position => ({
                key: position,
                value: transformPositionToValue(position)
              }))}
              onChange={option =>
                setValues({ ...values, position: option.key as Position })
              }
            />
          </FieldLayout>

          <FieldLayout fieldName="Experience">
            <ListBox
              options={Object.values(Experience).map(experience => ({
                key: experience,
                value: transformExperienceToValue(experience)
              }))}
              onChange={option =>
                setValues({ ...values, experience: option.key as Experience })
              }
            />
          </FieldLayout>

          <FieldLayout fieldName="Employment type">
            <ListBox
              options={Object.values(EmploymentType).map(type => ({
                key: type,
                value: transformTypeToValue(type)
              }))}
              onChange={option =>
                setValues({ ...values, type: option.key as EmploymentType })
              }
            />
          </FieldLayout>

          <FieldLayout fieldName="Skills">
            <ListBoxArray
              options={[
                'C#',
                'React',
                'TypeScript',
                'C',
                'C++',
                'JavaScript',
                'HTML',
                'CSS',
                'AWS',
                'Figma'
              ]}
              onChange={option =>
                setValues({ ...values, skills: option as [] })
              }
            />
          </FieldLayout>

          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <p className="pb-2 italic text-gray-600">
                You can use Markdown to format text
              </p>
              <textarea
                value={values.description}
                onChange={e =>
                  setValues({ ...values, description: e.target.value })
                }
                required
                rows={20}
                className="block w-full rounded-md border border-gray-300 p-3"
              ></textarea>
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-8 flex justify-end space-x-2">
        <button
          onClick={closeModal}
          type="button"
          className="px-4 py-2 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none"
        >
          Create job post
        </button>
      </div>
    </form>
  );
});

Form.displayName = 'Form';

export { Form };
