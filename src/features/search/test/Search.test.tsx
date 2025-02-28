import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Search } from "../ui/Search";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Search", () => {
    it("renders the search input with the provided query", () => {
        const onSearch = vi.fn();
        render(<Search query="test query" onSearch={onSearch} records={10} />);
        
        const input = screen.getByPlaceholderText(/What test are you looking for?/) as HTMLInputElement;
        expect(input).toHaveValue("test query");
    });

    it("calls onSearch with the correct query after typing", async () => {
        const onSearch = vi.fn();
        render(<Search query="" onSearch={onSearch} records={10} />);
        
        const input = screen.getByPlaceholderText(/What test are you looking for?/) as HTMLInputElement;
        
        fireEvent.change(input, { target: { value: "new query" } });

        await waitFor(() => expect(onSearch).toHaveBeenCalledWith("new query"));
    });

    it("shows the correct number of records", () => {
        const onSearch = vi.fn();
        render(<Search query="" onSearch={onSearch} records={15} />);

        expect(screen.getByText(/15 tests/)).toBeInTheDocument();
    });

    it("delays search on input change by 500ms", async () => {
        const onSearch = vi.fn();
        render(<Search query="" onSearch={onSearch} records={0} />);
        
        const input = screen.getByPlaceholderText(/What test are you looking for?/) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "delayed query" } });

        expect(onSearch).not.toHaveBeenCalled();

        await waitFor(() => expect(onSearch).toHaveBeenCalledWith("delayed query"), { timeout: 600 });
    });
});
