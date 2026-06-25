"use client";
import { updateBook } from "@/app/lib/actions/books";
import { BookOpen } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField, TextArea } from "@heroui/react";

const inputClass =
    "w-full rounded-lg border-ink-thin bg-paper px-3 py-2 font-display text-sm text-ink " +
    "placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-sun focus:ring-offset-2 focus:ring-offset-paper";

export function EditBookModal({ book }) {
    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const bookDetails = Object.fromEntries(formData.entries())
        const updatedBook = {
            ...bookDetails,
            price: parseInt(bookDetails.price)
        };
        console.log(updatedBook);

        const res = await updateBook(book._id, updatedBook)

        console.log(res);
    }
    return (
        <Modal>
            <Button variant="secondary" className="btn-ghost">
                Edit Book
            </Button>
            <Modal.Backdrop variant="blur" className="bg-ink/50">
                <Modal.Container size="lg">
                    <Modal.Dialog className="border-ink shadow-ink rounded-lg bg-paper">
                        <Modal.CloseTrigger className="text-ink/60 hover:text-ink hover:bg-ink/5" />
                        <Modal.Header>
                            <Modal.Icon className="border-ink-thin -rotate-6 rounded-full bg-sun text-ink">
                                <BookOpen className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-ink">Edit Book</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-ink/60">
                                Update the details for &quot;{book?.title}&quot;.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6 bg-paper">
                            <Surface variant="default">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-paper">
                                    <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                                        <div className="flex flex-col gap-2">
                                            <div className="border-ink aspect-[2/3] w-full overflow-hidden rounded-lg bg-wave/10">
                                                {book?.coverImage && (
                                                    <img src={book.coverImage} alt="" className="h-full w-full object-cover" />
                                                )}
                                            </div>
                                            <TextField className="w-full" name="coverImage" defaultValue={book?.coverImage}>
                                                <Label className="text-xs font-semibold text-ink/70">Cover URL</Label>
                                                <Input placeholder="https://…" className={`${inputClass} text-xs`} />
                                            </TextField>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <TextField className="w-full" name="title" defaultValue={book?.title}>
                                                <Label className="text-sm font-semibold text-ink">Title</Label>
                                                <Input placeholder="Book title" className={inputClass} />
                                            </TextField>

                                            <div className="grid grid-cols-2 gap-4">
                                                <TextField className="w-full" name="genre" defaultValue={book?.genre}>
                                                    <Label className="text-sm font-semibold text-ink">Genre</Label>
                                                    <Input placeholder="e.g. Fiction" className={inputClass} />
                                                </TextField>

                                                <TextField className="w-full" name="price" type="number" defaultValue={book?.price}>
                                                    <Label className="text-sm font-semibold text-ink">Price (USD)</Label>
                                                    <Input placeholder="0.00" className={inputClass} />
                                                </TextField>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <TextField className="w-full" name="status" defaultValue={book?.status}>
                                                    <Label className="text-sm font-semibold text-ink">Status</Label>
                                                    <Input placeholder="Available / Unavailable" className={inputClass} />
                                                </TextField>

                                                <TextField className="w-full" name="parchment" defaultValue={book?.parchment}>
                                                    <Label className="text-sm font-semibold text-ink">Visibility</Label>
                                                    <Input placeholder="published / unpublished" className={inputClass} />
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>

                                    <TextField className="w-full" name="description" defaultValue={book?.description}>
                                        <Label className="text-sm font-semibold text-ink">Description</Label>
                                        <TextArea rows={3} placeholder="Short blurb…" className={`${inputClass} resize-none`} />
                                    </TextField>
                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary" className="btn-ghost">
                                            Cancel
                                        </Button>
                                        <Button slot="close" type="submit" className="btn-primary">
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}