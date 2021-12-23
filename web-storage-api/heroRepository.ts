type SuperHero = { name: string; powers: string };

class SuperheroRepo {
  len(): number {
    return localStorage.length;
  } //.

  add(superhero: SuperHero) {
    const { name, powers } = superhero;
    localStorage.setItem(name.toLowerCase(), powers.toLowerCase());
  } //.

  find(name: string): SuperHero {
    return { name: name, powers: localStorage.getItem(name)! };
  } //.

  findAll(): SuperHero[] {
    const count = this.len();
    const all: SuperHero[] = [];
    for (let i = 0; i < count; i++) {
      const name = localStorage.key(i);
      all.push(this.find(name!));
    }
    return all;
  } //.

  remove(name: string) {
    localStorage.removeItem(name.toString());
  } //.

  clear() {
    localStorage.clear();
  } //.
} //. SuperheroRepo
const repo = new SuperheroRepo();

export { repo as heroRepository };
