import { Amazon } from 'svgs/amazon';
import { Facebook } from 'svgs/facebook';
import { Google } from 'svgs/google';
import { Microsoft } from 'svgs/microsoft';

export const Logos = () => (
  <div className="grid grid-cols-4 items-center gap-20 text-gray-400">
    <Microsoft />
    <Amazon />
    <Facebook />
    <Google />
  </div>
);
