import universal from 'react-universal-component';
export const CatsComponent = universal(() => import('../cats/cats.module'), {
  resolve: () => require.resolveWeak('../cats/cats.module')
});