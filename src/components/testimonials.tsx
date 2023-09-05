import { Logos } from 'components/logos';
import TestimonialsData from 'data/testimonials.json';

type TestimonialProps = {
  name: string;
  image: string;
  company: string;
  testimonial: string;
};

const Testimonial = ({
  name,
  image,
  company,
  testimonial
}: TestimonialProps) => (
  <div className="flex flex-col space-y-4 rounded-md border-t-4 border-blue-500 bg-white p-6 shadow">
    <p className="flex-grow leading-relaxed text-gray-600">{testimonial}</p>
    <div className="flex items-center">
      <span className="h-12 w-12 flex-shrink-0">
        <img className="rounded-full" src={image} />
      </span>
      <span className="flex flex-grow flex-col pl-4">
        <span className="font-medium">{name}</span>
        <span className="text-sm">{company}</span>
      </span>
    </div>
  </div>
);

export const Testimonials = () => {
  return (
    <div className="overflow-hidden bg-gray-100">
      <div className="my-32 mx-auto max-w-5xl space-y-16">
        <div className="text-center text-3xl font-bold">
          We are trusted by more than 1000 companies
        </div>
        <div className="grid grid-cols-3 gap-10">
          {TestimonialsData.map(({ id, name, image, company, testimonial }) => (
            <Testimonial
              key={id}
              name={name}
              image={image}
              company={company}
              testimonial={testimonial}
            />
          ))}
        </div>
        <Logos />
      </div>
    </div>
  );
};
