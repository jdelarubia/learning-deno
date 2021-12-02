type SuperHero = { name: string; powers: string };

class SuperheroRepo {
  length(): number {
    return localStorage.length;
  } //.

  add(superhero: SuperHero) {
    const { name, powers } = superhero;
    localStorage.setItem(name.toLowerCase(), powers.toLowerCase());
  } //.

  get(name: string): SuperHero {
    return { name: name, powers: localStorage.getItem(name)! };
  } //.

  getAll(): SuperHero[] {
    const count = this.length();
    const all: SuperHero[] = [];
    for (let i = 0; i < count; i++) {
      const name = localStorage.key(i);
      all.push(this.get(name!));
    }
    return all;
  } //.

  remove(name: string) {
    localStorage.removeItem(name);
  } //.

  clear() {
    localStorage.clear();
  } //.
} //. SuperheroRepo
const repo = new SuperheroRepo();

export { repo as heroRepository };
