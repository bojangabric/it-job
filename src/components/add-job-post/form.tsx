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

const Form = forwardRef<HTMLDivElement, FormProps>(({ closeModal }, ref) => {
  const [values, setValues] = useState<FieldTypes>({
    active: false,
    title: '',
    position: Position.FULL_STACK_DEVELOPER,
    experience: Experience.JUNIOR,
    type: EmploymentType.FULL_TIME,
    skills: [],
    description: ''
  });
  const { update } = useSession();

  const { mutate: createJobPost } = api.jobPosts.createJobPost.useMutation({
    onSuccess: update
  });

  return (
    <div
      ref={ref}
      className="my-8 inline-block w-full max-w-6xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Dodajte novi oglas
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="items-center px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Aktivan</dt>
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
            <dt className="text-sm font-medium text-gray-500">Ime oglasa</dt>
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

          <FieldLayout fieldName="Pozicija">
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

          <FieldLayout fieldName="Iskustvo">
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

          <FieldLayout fieldName="Tip zaposlenja">
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

          <FieldLayout fieldName="Tehnologije">
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
            <dt className="text-sm font-medium text-gray-500">Oglas</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <textarea
                value={values.description}
                onChange={e =>
                  setValues({ ...values, description: e.target.value })
                }
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
          Prekini
        </button>
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            createJobPost(values);
            closeModal();
          }}
        >
          Napravi novi oglas
        </button>
      </div>
    </div>
  );
});

Form.displayName = 'Form';

export { Form };
