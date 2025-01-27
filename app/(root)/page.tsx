import BookList from '@/components/book-list';
import BookOverview from '@/components/book-overview';
import { sampleBooks } from '@/constants';

export default async function Home() {

  return (
    <>
      <BookOverview
        {...{ ...sampleBooks[0], id: sampleBooks[0].id.toString() }}
      />

      <BookList
        title="Latest Books"
        books={sampleBooks.map((book) => ({ ...book, id: book.id.toString() }))}
        containerClassName="mt-28"
      />
    </>
  );
}
